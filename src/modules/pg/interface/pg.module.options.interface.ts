import { ModuleMetadata } from '@nestjs/common';
import { PoolConfig } from 'pg';

export interface PGOptions extends PoolConfig {
  poolName: string;
}

export interface PGModuleOptions {
  config: PGOptions[];
}

export interface PGModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (args: any) => Promise<PGModuleOptions> ;
  inject?: any[];
}
