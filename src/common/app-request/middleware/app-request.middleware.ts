import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AppRequest } from '../interface/app-request.interface';
import helmet from 'helmet';
/**
 * TODO :: helmet 모듈 기능 확인 중
 *
 * */
@Injectable()
export class AppRequestMiddleware implements NestMiddleware {
  use(req: AppRequest, res: Response, next: NextFunction): void {
    // helmet({ contentSecurityPolicy: false })(req, res, next);
    const language_tag = req.header('language_tag') || '';

    req._language_tag = language_tag;

    res.removeHeader('X-Powered-By');
    next();
  }
}
