import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';
import { AppLoggerService } from '../services/app-logger.service';
import { AppLogAction } from '../constants/app-logger.enum.constant';
import { TimeoutError } from 'rxjs';

@Catch()
export class AppLoggerErrorFilter implements ExceptionFilter {
  constructor(private readonly appLogger: AppLoggerService) {}

  async catch(exception: any, host: ArgumentsHost): Promise<any> {
    const ctx: HttpArgumentsHost = host.switchToHttp();

    const { ip, body, query, params, headers, cookies, path, method, originalUrl } = ctx.getRequest<Request>();

    const { logAction, logMessage, statusCode } = this.getExceptionAction(exception);

    const logParams = { headers, params, query, body, cookies, ip };

    await this.appLogger.log({
      action: logAction,
      path: path,
      method: method,
      params: logParams,
      statusCode: statusCode,
      description: `${method} Request, url ${originalUrl}, Message ${logMessage}`
    });

    const response: Response = ctx.getResponse<Response>();
    response.status(statusCode).json({ message: [logMessage] });

    return response;
  }

  private getExceptionAction(exception: any): { logAction: AppLogAction; logMessage: string; statusCode: number } {
    if (exception instanceof HttpException) {
      return {
        logAction: AppLogAction.HttpException,
        logMessage: `HttpException - ${exception.message}`,
        statusCode: exception.getStatus()
      };
    } else if (exception instanceof TimeoutError) {
      return {
        logAction: AppLogAction.Timeout,
        logMessage: `TimeoutError - ${exception.message}`,
        statusCode: HttpStatus.REQUEST_TIMEOUT
      };
    } else {
      return {
        logAction: AppLogAction.Error,
        logMessage: `Error - ${exception.message}`,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR
      };
    }
  }
}
