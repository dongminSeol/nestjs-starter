import { Module, DynamicModule } from '@nestjs/common';
import { AWS_S3_MODULE_OPTIONS } from './constant/aws.s3.constant';
import { AwsS3ModuleAsyncOptions, AwsS3ModuleOptions } from './interface/aws.s3.module.option.interface';
import { AwsS3Service } from './service/aws.s3.service';

@Module({
  providers: [AwsS3Service],
  exports: [AwsS3Service]
})
export class AwsS3Module {
  static register(options: AwsS3ModuleOptions): DynamicModule {
    return {
      global: true,
      module: AwsS3Module,
      providers: [
        {
          provide: AWS_S3_MODULE_OPTIONS,
          useValue: options
        }
      ]
    };
  }
  static forRoot(options: AwsS3ModuleOptions): DynamicModule {
    return {
      module: AwsS3Module,
      providers: [
        {
          provide: AWS_S3_MODULE_OPTIONS,
          useValue: options
        }
      ]
    };
  }
  static forRootAsync(options: AwsS3ModuleAsyncOptions): DynamicModule {
    return {
      module: AwsS3Module,
      imports: options.imports || [],
      providers: [{
        provide: AWS_S3_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      }]
    };
  }
}
