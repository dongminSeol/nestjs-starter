import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { AppJwtOptions, AppJwtTokenPayload, AppJwtVerifyOptions } from '../interfaces/app-jwt.interface';

@Injectable()
export class AppAuthConfigService {
  private readonly accessTokenExpired: number | undefined;
  private readonly accessTokenSecretKey: string | undefined;
  private readonly refreshTokenSecretKey: string | undefined;
  private readonly refreshTokenExpired: number | undefined;

  private readonly audience: string | undefined;
  private readonly issuer: string | undefined;
  private readonly subject: string | undefined;
  constructor(private readonly jwtService: JwtService, private readonly config: ConfigService) {
    this.accessTokenSecretKey = this.config.get<string>('APP_JWT_ACCESS_TOKEN_SECRET_KEY');
    this.accessTokenExpired = this.config.get<number>('APP_JWT_ACCESS_TOKEN_EXPIRED');

    this.refreshTokenSecretKey = this.config.get<string>('APP_JWT_REFRESH_TOKEN_SECRET_KEY');
    this.refreshTokenExpired = this.config.get<number>('APP_JWT_REFRESH_TOKEN_EXPIRED');

    this.subject = this.config.get<string>('APP_AUTH_SUBJECT');
    this.audience = this.config.get<string>('APP_AUTH_AUDIENCE');
    this.issuer = this.config.get<string>('APP_AUTH_ISSUER');
  }
  private jwtEncrypt(payload: Record<string, any>, options: AppJwtOptions): string {
    return this.jwtService.sign(payload, {
      secret: options.secretKey,
      expiresIn: options.expiredIn,
      notBefore: options.notBefore ?? 0,
      audience: options.audience,
      issuer: options.issuer,
      subject: options.subject
    });
  }
  private jwtVerify(token: string, options: AppJwtVerifyOptions): boolean {
    try {
      this.jwtService.verify(token, {
        secret: options.secretKey,
        audience: options.audience,
        issuer: options.issuer,
        subject: options.subject,
        ignoreExpiration: options.ignoreExpiration ?? false
      });

      return true;
    } catch (err: unknown) {
      return false;
    }
  }

  generateAccessToken(payload: AppJwtTokenPayload) {
    return this.jwtEncrypt(payload, {
      secretKey: this.accessTokenSecretKey,
      expiredIn: this.accessTokenExpired,
      audience: this.audience,
      issuer: this.issuer,
      subject: this.subject
    });
  }
  generateRefreshToken(payload: AppJwtTokenPayload) {
    return this.jwtEncrypt(payload, {
      secretKey: this.refreshTokenSecretKey,
      expiredIn: this.refreshTokenExpired,
      audience: this.audience,
      issuer: this.issuer,
      subject: this.subject
    });
  }

  validateAccessToken(accessToken: string) {
    return this.jwtVerify(accessToken, {
      secretKey: this.accessTokenSecretKey,
      audience: this.audience,
      issuer: this.issuer,
      subject: this.subject
    });
  }
  validateRefreshToken(refreshToken: string) {
    return this.jwtVerify(refreshToken, {
      secretKey: this.refreshTokenSecretKey,
      audience: this.audience,
      issuer: this.issuer,
      subject: this.subject
    });
  }
  validatePassword(password: string, passwordHash: string) {
    return compareSync(password, passwordHash);
  }
  decodeTokenPayload(token: string): AppJwtTokenPayload {
    return this.jwtService.decode(token);
  }

  generatePassword(passwordString: string, saltLength = 10): string {
    return hashSync(passwordString, saltLength);
  }

  generateSalt(length: number): string {
    return genSaltSync(length);
  }
}
