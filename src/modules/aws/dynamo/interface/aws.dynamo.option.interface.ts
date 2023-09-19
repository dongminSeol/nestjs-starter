import { ModuleMetadata, Type } from '@nestjs/common';

export interface AwsDynamoModuleOptions {
  region: string;
  publicKey: string;
  privateKey: string;
}
export interface AwsDynamoModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<AwsDynamoModuleOptions> | AwsDynamoModuleOptions;
  inject?: any[];
}
