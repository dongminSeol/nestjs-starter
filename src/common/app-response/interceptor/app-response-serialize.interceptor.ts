import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

export class AppResponseSerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((response) => {
        const dto = response?.data || response;
        const newDto = plainToInstance(this.dto, dto || null, {
          excludeExtraneousValues: true
        });
        return {
          meta: response?.meta,
          data: newDto
        };
      })
    );
  }
}
