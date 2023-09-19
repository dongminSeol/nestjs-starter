import { ModuleMetadata } from '@nestjs/common';

export interface AwsSqsModuleOptions {
  region: string;
  publicKey: string;
  privateKey: string;
}
export interface AwsSqsModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<AwsSqsModuleOptions> | AwsSqsModuleOptions;
  inject?: any[];
}
