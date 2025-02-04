import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AppRequest } from '../interfaces/app-request.interface';
import helmet from 'helmet';
/**
 * TODO :: helmet 모듈 기능 확인 중
 *
 * */
@Injectable()
export class AppRequestMiddleware implements NestMiddleware {
  use(req: AppRequest, res: Response, next: NextFunction): void {
    // helmet({ contentSecurityPolicy: false })(req, res, next);
    res.removeHeader('X-Powered-By');
    next();
  }
}
