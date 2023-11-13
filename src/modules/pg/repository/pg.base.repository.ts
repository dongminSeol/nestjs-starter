import { Injectable } from '@nestjs/common';
import { QueryConfig, QueryResult } from 'pg';
import { PostgreSQLService } from '../service/pg.service';

@Injectable()
export class PgBaseRepository<T> {
  constructor(private readonly postgreService: PostgreSQLService) {}

  async executeQueryAsSingle(poolName: string, params: QueryConfig): Promise<T | undefined> {
    return await this.postgreService.executeQueryAsSingle<T>(poolName, params);
  }

  async executeQueryAsList(poolName: string, params: QueryConfig): Promise<QueryResult<T>> {
    return this.postgreService.executeQueryAsList<T>(poolName, params);
  }
}
