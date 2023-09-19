import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppRequest } from '../../app-request/interface/app-request.interface';
import { AppCacheService } from '../../app-cache/service/app-cache.service';

@Injectable()
export class AppAuthInterceptor implements NestInterceptor<Promise<any>> {
  constructor(private readonly cache: AppCacheService) {
  }

  intercept(context: ExecutionContext, next: CallHandler<Promise<any>>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<AppRequest>();

    if (request._isAuthorized) {
      this.cache.refreshActiveUserExpiration(request._id, 60 * 15);
    }

    return next.handle();
  }
}
