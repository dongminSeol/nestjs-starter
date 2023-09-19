import { Module, DynamicModule } from '@nestjs/common';
import { AwsDynamoModuleAsyncOptions, AwsDynamoModuleOptions } from './interface/aws.dynamo.option.interface';
import { AWS_DYNAMO_MODULE_OPTIONS } from './constant/aws.dynamo.constant';
import { AwsDynamoService } from './service/aws.dynamo.service';
@Module({
  providers: [AwsDynamoService],
  exports: [AwsDynamoService]
})
export class AwsDynamoModule {
  static register(options: AwsDynamoModuleOptions): DynamicModule {
    return {
      global: true,
      module: AwsDynamoModule,
      providers: [
        {
          provide: AWS_DYNAMO_MODULE_OPTIONS,
          useValue: options
        }
      ]
    };
  }
  static forRoot(options: AwsDynamoModuleOptions): DynamicModule {
    return {
      module: AwsDynamoModule,
      providers: [
        {
          provide: AWS_DYNAMO_MODULE_OPTIONS,
          useValue: options
        }
      ]
    };
  }
  static forRootAsync(options: AwsDynamoModuleAsyncOptions): DynamicModule {
    return {
      module: AwsDynamoModule,
      imports: options.imports || [],
      providers: [{
        provide: AWS_DYNAMO_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      }]
    };
  }
}
