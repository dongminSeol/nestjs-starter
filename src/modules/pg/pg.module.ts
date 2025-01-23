import { DynamicModule, Module } from '@nestjs/common';
import { PGService } from './services/pg.service';
import { PGModuleAsyncOptions, PGModuleOptions } from './interfaces/pg.interface';
import { PG_MODULE_OPTIONS } from './constants/pg.constant';

@Module({
  exports: [PGService],
  providers: [PGService]
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
      providers: [
        {
          provide: PG_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || []
        }
      ]
    };
  }
}
