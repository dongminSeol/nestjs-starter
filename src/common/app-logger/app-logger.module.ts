import { Module } from '@nestjs/common';
import { AppLoggerService } from './service/app-logger.service';
import { AppLoggerInterceptor } from './interceptor/app-logger.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppLoggerEntity, AppLoggerSchema } from './entity/app-logger.entity';
import { AppLoggerErrorFilter } from './filter/app-logger-error.filter';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://test:test_1024@localhost:27017/',
      {
        maxPoolSize: 50
      }),
    MongooseModule.forFeature([{ name: AppLoggerEntity.name, schema: AppLoggerSchema }])
  ],
  providers: [
    AppLoggerService,
    {
      /**
       * Request, Response 로그를 처리 합니다.
       * */
      provide: APP_INTERCEPTOR,
      useClass: AppLoggerInterceptor
    },
    {
      /**
       * Exception, Error 처리 및 로그 생성.
       * */
      provide: APP_FILTER,
      useClass: AppLoggerErrorFilter
    }
  ],
  exports: [AppLoggerService]
})
export class AppLoggerModule {
}
