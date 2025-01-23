import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppResponseInterceptor } from './interceptors/app-response.interceptor';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AppResponseInterceptor
    }
  ]
})
export class AppResponseModule {}
