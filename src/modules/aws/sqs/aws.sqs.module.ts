import { DynamicModule, Module } from '@nestjs/common';
import { AwsSqsService } from './service/aws.sqs.service';
import { AwsSqsModuleAsyncOptions, AwsSqsModuleOptions } from './interface/aws.sqs.module.option.interface';
import { AWS_SQS_MODULE_OPTIONS } from './constant/aws.sqs.constant';

@Module({
  providers: [AwsSqsService],
  exports: [AwsSqsService]
})
export class AwsSqsModule {
  static register(options: AwsSqsModuleOptions): DynamicModule {
    return {
      global: true,
      module: AwsSqsModule,
      providers: [
        {
          provide: AWS_SQS_MODULE_OPTIONS,
          useValue: options
        }
      ]
    };
  }
  static registerAsync(options: AwsSqsModuleAsyncOptions): DynamicModule {
    return {
      global: true,
      module: AwsSqsModule,
      imports: options.imports || [],
      providers: [
        {
          provide: AWS_SQS_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || []
        }
      ]
    };
  }
  static forRoot(options: AwsSqsModuleOptions): DynamicModule {
    return {
      module: AwsSqsModule,
      providers: [
        {
          provide: AWS_SQS_MODULE_OPTIONS,
          useValue: options
        }
      ]
    };
  }
  static forRootAsync(options: AwsSqsModuleAsyncOptions): DynamicModule {
    return {
      module: AwsSqsModule,
      imports: options.imports || [],
      providers: [
        {
          provide: AWS_SQS_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || []
        }
      ]
    };
  }
}
