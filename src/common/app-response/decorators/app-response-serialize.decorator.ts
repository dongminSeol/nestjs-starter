import { Type, UseInterceptors } from '@nestjs/common';
import { AppResponseSerializeInterceptor } from '../interceptors/app-response-serialize.interceptor';

export function AppResponseSerialize(dto: Type) {
  return UseInterceptors(new AppResponseSerializeInterceptor(dto));
}
