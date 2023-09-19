import { Inject, Injectable, Logger } from "@nestjs/common";
import { Pool, QueryConfig, QueryResult } from 'pg';
import { PGModuleOptions, PGOptions } from '../interface/pg.module.options.interface';
import { PG_MODULE_OPTIONS } from '../constant/pg.constant';

@Injectable()
export class PgService {
  private readonly pgPools: Map<string, Pool> = new Map<string, Pool>();

  constructor(@Inject(PG_MODULE_OPTIONS) options: PGModuleOptions) {
    this.initializePools(options.config);
  }

  private initializePools(options: PGOptions[]) {
    options.forEach((option: PGOptions) => {
      this.pgPools.set(
        option.poolName,
        new Pool({
          connectionString: option.connectionString,
          connectionTimeoutMillis: option.connectionTimeoutMillis,
          max: option.max
        })
      );
    });
  }


  private getPool(poolName: string) {
    return this.pgPools.get(poolName);
  }

  private logQueryExecutionTime(startTime: number, params: QueryConfig) {
    const endTime = Date.now();
    Logger.verbose(`Query in ${endTime - startTime}ms - Params: ${JSON.stringify(params)}`);
  }

  public async executeQuery<T>(pool: string, params: QueryConfig): Promise<QueryResult<T>> {

    try {
      const startTime = Date.now();
      const result = await this.getPool(pool).query<T>(params);

      this.logQueryExecutionTime(startTime, params);

      return result;

    } catch (err) {
      throw new Error(`Error executing query: ${err.message}`);
    }
  }

  public async executeQueryAsSingle<T>(poolName: string, params: QueryConfig): Promise<T | undefined> {
    const result = await this.executeQuery<T>(poolName, params);

    if (result.rows.length === 0) {
      return undefined;
    }
    return result.rows[0];
  }

  public async executeQueryAsList<T>(poolName: string, params: QueryConfig): Promise<QueryResult<T>> {
    return await this.executeQuery<T>(poolName, params);
  }

}
