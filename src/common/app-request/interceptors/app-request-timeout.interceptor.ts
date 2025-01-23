import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, retry } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppRequestTimeoutInterceptor implements NestInterceptor<Promise<any>> {
  private readonly requestTimeout: number;
  private readonly requestRetryCount: number;

  constructor(private readonly configService: ConfigService) {
    this.requestTimeout = this.configService.get<number>(`app.request.timeout`);
    this.requestRetryCount = this.configService.get<number>(`app.request.retryCount`);
  }

  intercept(context: ExecutionContext, next: CallHandler<Promise<any>>): Observable<any> | Promise<Observable<any>> {
    if (context.getType() === 'http') {
      return next.handle().pipe(timeout(Number(this.requestTimeout)), retry(this.requestRetryCount));
    }
  }
}
