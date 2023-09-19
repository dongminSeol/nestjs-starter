import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppCacheService } from '../../app-cache/service/app-cache.service';
import { TokenUtil } from '../../app-utils/token.util';

@Injectable()
export class AppAuthService {
  private readonly accessTokenExpired: number;
  private readonly accessTokenSecretKey: string;
  private readonly refreshTokenSecretKey: string;
  private readonly refreshTokenExpired: number;

  constructor(private readonly cache: AppCacheService, private readonly config: ConfigService) {
    this.accessTokenSecretKey = this.config.get<string>('app.accessToken.secretKey');
    this.accessTokenExpired = this.config.get<number>('app.accessToken.expired');

    this.refreshTokenSecretKey = this.config.get<string>('app.refreshToken.secretKey');
    this.refreshTokenExpired = this.config.get<number>('app.refreshToken.expired');
  }

  private async isAccessTokenCached(accessToken: string): Promise<boolean> {
    // 주어진 토큰에서 페이로드를 디코딩합니다.
    const payload = TokenUtil.decodeJwt(accessToken);

    // 디코딩된 사용자 ID를 사용하여 캐시된 토큰 값 가져오기
    const cacheValue = await this.cache.getAccessToken(payload?.id);

    // 주어진 토큰을 캐시된 토큰 값과 비교
    return accessToken === cacheValue;
  }

  private async isRefreshTokenCached(refreshToken: string): Promise<boolean> {
    // 주어진 토큰에서 페이로드를 디코딩합니다.
    const payload = TokenUtil.decodeJwt(refreshToken);

    // 디코딩된 사용자 ID를 사용하여 캐시된 토큰 값 가져오기
    const cacheValue = await this.cache.getRefreshToken(payload?.id);

    // 주어진 토큰을 캐시된 토큰 값과 비교
    return refreshToken === cacheValue;
  }

  public getJwtTokenPayload (token: string): Record<string, any> {
    return TokenUtil.decodeJwt(token);
  }

  public async generateAccessToken(id: number, data?: Record<string, any>) {
    const payload = {
      id: id,
      ...data
    };
    const { token, expires } = TokenUtil.generate(payload, this.accessTokenSecretKey, {
      subject: '',
      audience: '',
      issuer: '',
      expiresIn: Number(this.accessTokenExpired)
    });
    await this.cache.setAccessToken(id, token, Number(this.accessTokenExpired));
    return token;
  }

  public async verifyAccessToken(accessToken: string): Promise<boolean> {
    const isValidToken = TokenUtil.verifyJwt(accessToken, this.accessTokenSecretKey);
    if (isValidToken) {
      return await this.isAccessTokenCached(accessToken);
    }
    return false;
  }


  public async generateRefreshToken(id: number, data?: Record<string, any>) {
    const payload = {
      id: id,
      ...data
    };
    const { token, expires } = TokenUtil.generate(payload, this.refreshTokenSecretKey, {
      subject: '' ,
      audience: '',
      issuer: '',
      expiresIn: Number(this.refreshTokenExpired)
    });
    await this.cache.setRefreshToken(id, token, Number(this.refreshTokenExpired));

    return token;
  }

  public async verifyRefreshToken(refreshToken: string): Promise<boolean> {
    const isValidToken = TokenUtil.verifyJwt(refreshToken, this.refreshTokenSecretKey);
    if (isValidToken) {
      return await this.isRefreshTokenCached(refreshToken);
    }
    return false;
  }

  public verifyJwks(token: string, key: Record<any, any>, issuer: string, audience: string): boolean {
    return TokenUtil.verifyJwks(token, key, issuer, audience);
  }

  public async generateOTPCode(key: string) {
    const otpCode = TokenUtil.generateOTP();
    await this.cache.setOTPCode(key, otpCode, 1000 * 60);

    return otpCode;
  }

  /**
   * 엑세스, 리프레시 캐시 삭제
   */
  public async deleteTokens(id: number): Promise<void> {
    await this.cache.delAccessToken(id);
    await this.cache.delRefreshToken(id);
  }


}
