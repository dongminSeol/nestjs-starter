import { DynamicModule, Module } from '@nestjs/common';
import { PgService } from './service/pg.service';
import { PGModuleAsyncOptions, PGModuleOptions } from './interface/pg.module.options.interface';
import { PG_MODULE_OPTIONS } from './constant/pg.constant';

@Module({
  exports: [PgService],
  providers: [PgService]
})
export class PGModule {
  static register(options: PGModuleOptions): DynamicModule {
    return {
      global: true,
      module: PGModule,
      providers: [
        {
          provide: PG_MODULE_OPTIONS,
          useValue: options
        }
      ]
    };
  }

  static registerAsync(options: PGModuleAsyncOptions): DynamicModule {
    return {
      global: true,
      module: PGModule,
      imports: options.imports || [],
      providers: [{
        provide: PG_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      }]
    };
  }
}
