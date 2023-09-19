import { ModuleMetadata } from '@nestjs/common';

export interface AwsS3ModuleOptions {
  region: string;
  publicKey: string;
  privateKey: string;
}
export interface AwsS3ModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<AwsS3ModuleOptions> | AwsS3ModuleOptions;
  inject?: any[];
}
