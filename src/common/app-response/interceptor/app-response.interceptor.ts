import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppResponse } from '../interface/app-response.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppResponseInterceptor<T> implements NestInterceptor<T, AppResponse<T>> {
  private readonly version: string;
  constructor(private readonly configService: ConfigService) {
    this.version = configService.get<string>('app.version');
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<AppResponse<T>> {
    return next.handle().pipe(
      map((response) => {
        const dto = response?.data || response;
        return {
          version: this.version,
          timestamp: new Date().getTime(),
          language_tag: response?.language_tag || 'ko',
          meta: response?.meta || null,
          data: dto || null
        };
      })
    );
  }
}
