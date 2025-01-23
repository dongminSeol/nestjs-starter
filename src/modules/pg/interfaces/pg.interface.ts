import { ModuleMetadata } from '@nestjs/common';
import { PoolConfig, QueryConfig } from 'pg';

export interface PGOptions extends PoolConfig {
  poolName: string;
}

export interface PGModuleOptions {
  isGlobal?: boolean;
  debug?: boolean;
  connectionName?: string;
  config: PGOptions[];
}

export interface PGModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  imports?: any[];
  isGlobal?: boolean;
  useFactory?: (args: any) => Promise<PGModuleOptions>;
  inject?: any[];
}

export interface PGExecuteProcedureResult {
  id: number;
  message: string;
  count: number;
}

export interface IPGService {
  getOptions(): PGOptions[];
  executeProcedure(poolName: string, params: QueryConfig): Promise<PGExecuteProcedureResult>;
  executeProcedure<T>(poolName: string, params: QueryConfig): Promise<T & PGExecuteProcedureResult>;
  executeQueryToSingleRow<T>(poolName: string, params: QueryConfig): Promise<T | undefined>;
  executeQueryToMultipleRows<T>(poolName: string, params: QueryConfig): Promise<T[]>;
  executeQueryToPagination<T>(
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
  }>;
}
