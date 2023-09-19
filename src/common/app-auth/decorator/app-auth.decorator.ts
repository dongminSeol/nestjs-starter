import { applyDecorators, createParamDecorator, ExecutionContext, SetMetadata, UseGuards } from '@nestjs/common';
import { SSO_LOGIN_META_KEY, VERIFY_TOKEN_META_KEY } from '../constant/app-auth.constant';
import { TokenAuthGuard } from '../guard/token-auth.guard';
import { SSOAuthGuard } from '../guard/sso-auth.guard';

export function TokenAuth(strategy: string): MethodDecorator & ClassDecorator {
  return applyDecorators(UseGuards(TokenAuthGuard), SetMetadata(VERIFY_TOKEN_META_KEY, strategy));
}

export function SSOAuth(strategy: string): MethodDecorator & ClassDecorator {
  return applyDecorators(UseGuards(SSOAuthGuard), SetMetadata(SSO_LOGIN_META_KEY, strategy));
}
