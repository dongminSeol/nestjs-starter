import { HttpStatus, Module, ValidationPipe, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppRequestTimeoutInterceptor } from './interceptor/app-request-timeout.interceptor';
import { AppRequestMiddleware } from './middleware/app-request.middleware';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () => {
        return new ValidationPipe({
          whitelist: true, // DTO 있는 값 사용
          forbidNonWhitelisted: true, // DTO 없는 값 에러
          transform: true, // DTO 형식으로 변환
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY // Validation Http Status 상태 값 맵핑
        });
      }
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AppRequestTimeoutInterceptor
    }
  ]
})
export class AppRequestModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppRequestMiddleware).forRoutes('*');
  }
}
