import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACCESS_TOKEN, REFRESH_TOKEN, VERIFY_TOKEN_META_KEY } from '../constants/app-auth.constant';
import { AppRequest } from '../../app-request/interfaces/app-request.interface';
import { AppAuthConfigService } from '../services/app-auth.config.service';

@Injectable()
export class AppJwtGuard implements CanActivate {
  private _request: AppRequest;

  constructor(private readonly reflector: Reflector, private readonly authService: AppAuthConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let isInProgress = false; // 진행 여부

    const requestMetaKey = this.reflector.getAllAndOverride<string>(VERIFY_TOKEN_META_KEY, [context.getHandler(), context.getClass()]);

    this._request = context.switchToHttp().getRequest<AppRequest>();

    try {
      switch (requestMetaKey) {
        case ACCESS_TOKEN:
          isInProgress = await this.validateAccessToken(this._request.headers?.authorization || null);
          break;
        case REFRESH_TOKEN:
          isInProgress = await this.validateRefreshToken(this._request.body?.refreshToken || null);
          break;
      }
    } catch (err) {
      throw new UnauthorizedException(err);
    }

    if (!isInProgress) {
      throw new UnauthorizedException();
    }

    return isInProgress;
  }

  private async validateAccessToken(authorization: string) {
    if (authorization) {
      const [bearer, accessToken] = authorization.split(' ');

      if (bearer === 'Bearer' && accessToken) {
        const isValidToken = this.authService.validateAccessToken(accessToken);

        if (isValidToken) {
          this.setTokenInRequest(accessToken);

          return true;
        }
      }
    }
    return false;
  }

  private async validateRefreshToken(refreshToken: string) {
    if (refreshToken) {
      const isValidToken = this.authService.validateRefreshToken(refreshToken);

      if (isValidToken) {
        this.setTokenInRequest(refreshToken);

        return true;
      }
    }
    return false;
  }

  private setTokenInRequest(token: string) {
    const { id, roleCode } = this.authService.decodeTokenPayload(token);
    this._request._id = id;
    this._request._roleCode = roleCode;
  }
}
