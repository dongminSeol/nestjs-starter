import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACCESS_TOKEN, REFRESH_TOKEN, VERIFY_TOKEN_META_KEY } from '../constant/app-auth.constant';
import { AppAuthService } from '../service/app-auth.service';
import { AppRequest } from '../../app-request/interface/app-request.interface';

@Injectable()
export class TokenAuthGuard implements CanActivate {
  private _request: AppRequest;

  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AppAuthService
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    let isInProgress = false; // 진행 여부

    const requestMetaKey = this.reflector.getAllAndOverride<string>(VERIFY_TOKEN_META_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requestMetaKey) {
      return true; // 지정되지 않았을 경우, 통과 처리
    }

    this._request = context.switchToHttp().getRequest<AppRequest>();

    try {

      switch (requestMetaKey) {
        case ACCESS_TOKEN:
          isInProgress = await this.verifyAccessToken(this._request.headers?.authorization || null);
          break;
        case REFRESH_TOKEN:
          isInProgress = await this.verifyRefreshToken(this._request.body?.refreshToken || null);
          break;
      }

    } catch (err) {
      throw new UnauthorizedException(err);
    }

    return isInProgress;
  }

  private async verifyAccessToken(authorization: string) {

    if (authorization) {
      const [bearer, accessToken] = authorization.split(' ');

      if (bearer === 'Bearer' && accessToken) {
        const isValidToken = await this.authService.verifyAccessToken(accessToken);

        if (isValidToken) {
          this.setTokenInRequest(accessToken);

          return true;
        }
      }

    }
    return false;
  }

  private async verifyRefreshToken(refreshToken: string) {

    if (refreshToken) {
      const isValidToken = await this.authService.verifyRefreshToken(refreshToken);

      if (isValidToken) {
        this.setTokenInRequest(refreshToken);

        return true;
      }
    }
    return false;
  }

  private setTokenInRequest (token: string) {
    const tokenPayload = this.authService.getJwtTokenPayload(token);

    this._request._id = tokenPayload?.id;
    this._request._payload = tokenPayload;
    this._request._isAuthorized= true;
  }
}
