import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Response, Request } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Observable, tap } from 'rxjs';
import { AppLoggerService } from '../services/app-logger.service';
import { AppLogAction } from '../constants/app-logger.enum.constant';
import { AppLoggerParams } from '../interfaces/app-logger-params.interface';

@Injectable()
export class AppLoggerInterceptor implements NestInterceptor<any> {
  constructor(private readonly appLogger: AppLoggerService) {}
  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<Promise<any> | string>> {
    if (context.getType() === 'http') {
      const ctx: HttpArgumentsHost = context.switchToHttp();

      const request = ctx.getRequest<Request>();
      const response = ctx.getResponse<Response>();

      const { ip, body, query, params, headers, cookies, path, method, originalUrl } = request;
      const statusCode = response.statusCode;

      const requestLog: AppLoggerParams = {
        action: AppLogAction.Request,
        path: path,
        method: method,
        params: {
          headers: { ...headers },
          params: { ...params },
          query: { ...query },
          body: { ...body },
          cookies: { ...cookies },
          ip
        },
        statusCode: statusCode,
        description: `${method} Request, url ${originalUrl}`
      };

      const responseLog: AppLoggerParams = {
        action: AppLogAction.Response,
        path: path,
        method: method,
        params: null,
        statusCode: statusCode,
        description: `${method} Response, url ${originalUrl}`
      };

      return next.handle().pipe(
        tap(async (responseData: Promise<Record<string, any>>) => {
          await this.appLogger.log(requestLog);
          await this.appLogger.log({ ...responseLog, params: responseData });
        })
      );
    }

    return next.handle();
  }
}
