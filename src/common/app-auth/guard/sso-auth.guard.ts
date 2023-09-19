import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { AppAuthService } from '../service/app-auth.service';
import { SSO_LOGIN_META_KEY } from '../constant/app-auth.constant';
import { AppRequest } from '../../app-request/interface/app-request.interface';


@Injectable()
export class SSOAuthGuard implements CanActivate {
  private readonly _env: string;
  private _request: AppRequest;

  constructor(
    private readonly reflector: Reflector,
    private readonly http: HttpService,
    private readonly auth: AppAuthService,
    private readonly config: ConfigService
  ) {
    this._env = this.config.get<string>(`app.env`);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    let isInProgress = false; // 진행 여부

    const requestMetaKey = this.reflector.getAllAndOverride<string>(SSO_LOGIN_META_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requestMetaKey) {
      return true; // 지정되지 않았을 경우, 통과 처리
    }

    this._request = context.switchToHttp().getRequest<AppRequest>();

    const idToken = this._request.body?.id_token || null;
    const { keyUri, issuer, audience } = this.getSSOConfig(requestMetaKey.toLowerCase());

    try {
      if (this._env === `local`) {
        this._request._payload = {
          iss: issuer,
          aud: audience,
          sub: idToken,
          phone_number: ''
        };
        isInProgress = !!idToken;
      } else {
        const keys = await this.fetchJwks(keyUri);
        isInProgress = await this.verifyJwks(idToken, keys, issuer, audience);
      }

    } catch (err) {
      throw new UnauthorizedException(err?.message);
    }

    if (!isInProgress) {
      throw new UnauthorizedException();
    }

    return isInProgress;

  }

  private getSSOConfig(platform: string): { keyUri: string, issuer: string, audience: string } {
    return this.config.get<{ keyUri: string; issuer: string; audience: string; }>(`sso.${platform}`);
  }

  private async verifyJwks(token: string, keys: Record<any, any>, issuer: string, audience: string) {
    const isValidToken = this.auth.verifyJwks(token, keys, issuer, audience);

    if (isValidToken) {
      this._request._payload = this.auth.getJwtTokenPayload(token);
      return true;
    }

    return false;
  }

  private async fetchJwks(uri: string): Promise<Record<string, any> | null> {
    const response = await firstValueFrom<AxiosResponse<Record<string, any>>>(this.http.get<Record<string, any>>(uri));
    return response?.data || null;
  }
}
