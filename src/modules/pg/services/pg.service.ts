import { Inject, Injectable, Logger } from '@nestjs/common';
import { Pool, QueryConfig, QueryResult, types, QueryResultRow } from 'pg';
import { PGModuleOptions, PGOptions, IPGService, PGExecuteProcedureResult } from '../interfaces/pg.interface';
import { PG_MODULE_OPTIONS } from '../constants/pg.constant';

@Injectable()
export class PGService implements IPGService {
  private readonly pgPools: Map<string, Pool> = new Map<string, Pool>();
  private readonly pgOptions: PGOptions[];
  private readonly debug: boolean | undefined;
  constructor(@Inject(PG_MODULE_OPTIONS) options: PGModuleOptions) {
    this.debug = options.debug;
    this.pgOptions = options.config;
    types.setTypeParser(20, (val) => {
      const num = Number(val);
      if (num > Number.MAX_SAFE_INTEGER) {
        throw new Error(`값 ${val}이 javaScript 의  정수 범위를 초과합니다.`);
      }
      return num;
    });
    this.initializePools(options.config);
  }

  private initializePools(options: PGOptions[]) {
    options.forEach((option: PGOptions) => {
      this.pgPools.set(
        option.poolName,
        new Pool({
          connectionString: option.connectionString,
          connectionTimeoutMillis: option.connectionTimeoutMillis,
          max: option.max,
          ssl: {
            rejectUnauthorized: false
          }
        })
      );
    });
  }

  private getPool(poolName: string): Pool {
    return this.pgPools.get(poolName) as Pool;
  }

  private mapKeysToCamelCase<T>(obj: Record<string, any>): T {
    const camelCasedObject: Record<string, any> = {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        camelCasedObject[camelKey] = obj[key];
      }
    }

    return camelCasedObject as T;
  }

  public getOptions(): PGOptions[] {
    return this.pgOptions;
  }

  private logQueryExecutionTime(startTime: number, params: QueryConfig) {
    const endTime = Date.now();
    Logger.verbose(`Query in ${endTime - startTime}ms - Params: ${JSON.stringify(params)}`);
  }

  private async executeQuery<T extends QueryResultRow>(pool: string, params: QueryConfig): Promise<QueryResult<T>> {
    try {
      const startTime = Date.now();
      const result = await this.getPool(pool).query<T>(params);

      this.logQueryExecutionTime(startTime, params);
      result.rows = result.rows.map((obj: T) => this.mapKeysToCamelCase<T>(obj));

      if (this.debug) {
        Logger.verbose(result.rows);
      }
      return result;
    } catch (err) {
      throw new Error(`Error executing query: ${err.message} params: ${params.text} ${params.values}`);
    }
  }
  public async executeProcedure<T>(poolName: string, params: QueryConfig) {
    return await this.executeQueryToSingleRow<T & PGExecuteProcedureResult>(poolName, params);
  }

  public async executeQueryToSingleRow<T>(poolName: string, params: QueryConfig): Promise<T | undefined> {
    const result = await this.executeQuery<T & QueryResultRow>(poolName, params);

    if (result.rows.length === 0) {
      return undefined;
    }

    return result.rows[0];
  }
  public async executeQueryToMultipleRows<T>(poolName: string, params: QueryConfig): Promise<T[]> {
    const { rows } = await this.executeQuery<T & QueryResultRow>(poolName, params);
    return rows;
  }
  public async executeQueryToPagination<T>(
    poolName: string,
    params: QueryConfig,
    options: {
      page: number;
      limit: number;
    }
  ): Promise<{
    meta: {
      totalCount: number;
      currPage: number;
      isPrev: boolean;
      isNext: boolean;
    };
    data: T[];
  }> {
    let _totalCount = 0;
    const _currPage = options.page;
    const _limit = options.limit;

    const { rows, rowCount } = await this.executeQuery<T & QueryResultRow>(poolName, params);

    if (rowCount > 0) {
      _totalCount = ((rows[0] as any).totalCount as number) ?? 1;
    }

    const filteredRows = rows.map((row: T) => {
      const { totalCount, ...rest } = row as any;
      return rest;
    });

    if (this.debug) {
      Logger.verbose({
        meta: {
          totalCount: _totalCount,
          currPage: _currPage,
          isPrev: _currPage !== 1,
          isNext: _currPage * _limit < _totalCount
        },
        data: filteredRows || []
      });
    }

    return {
      meta: {
        totalCount: Number(_totalCount),
        currPage: Number(_currPage),
        isPrev: _currPage !== 1,
        isNext: _currPage * _limit < _totalCount
      },
      data: filteredRows || []
    };
  }
}
