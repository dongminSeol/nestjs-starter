import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { VERIFY_TOKEN_META_KEY } from '../constants/app-auth.constant';
import { AppJwtGuard } from '../guards/app-jwt.guard';

export function AppJwtAuth(strategy: string): MethodDecorator & ClassDecorator {
  return applyDecorators(UseGuards(AppJwtGuard), SetMetadata(VERIFY_TOKEN_META_KEY, strategy));
}
