export interface AppJwtVerifyOptions {
  audience: string | undefined;
  issuer: string | undefined;
  subject: string | undefined;
  secretKey: string | undefined;
  ignoreExpiration?: boolean;
}
export interface AppJwtOptions extends Omit<AppJwtVerifyOptions, 'ignoreExpiration'> {
  expiredIn: number | string | undefined;
  notBefore?: number | string | undefined;
}

export interface AppJwtTokenPayload {
  id: number;
  roleCode: string | undefined;
}
