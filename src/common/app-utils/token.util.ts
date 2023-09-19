import { decode, JwtPayload, sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import * as jws from 'jws-jwk';

export class TokenUtil {
  static generate(payload: Record<string, any>, secret: string, opts?: SignOptions): { token: string; expires: number } {
    const token = sign(payload, secret, opts);
    const decoded = decode(token) as JwtPayload;
    return {
      token,
      expires: decoded.iat
    };
  }

  static generateOTP(len = 6) {
    const randomNumbers = [];
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < len; i++) {
      randomNumbers.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return randomNumbers.join('');
  }

  static verifyJwt(token: string, secret: string, opts?: VerifyOptions): boolean{
    try {
      if (!token) {
        return false;
      }
      const options: VerifyOptions = {
        ...opts,
        algorithms: ['HS256']
      };
      verify(token, secret, options);
      return true;
    } catch (err) {
      return false;
    }
  }

  static decodeJwt(token: string): Record<string, any> {
    return decode(token) as Record<string, any>;
  }

  static verifyJwks(token: string, key: Record<any, any>, issuer: string, audience: string): boolean {
    try {
      if (!token) {
        return false;
      }

      if (!jws.verify(token, key)) {
        return false;
      }

      const payload: JwtPayload = decode(token, { json: true }) as JwtPayload;
      const { iss, aud, exp } = payload;

      if (iss !== issuer || aud !== audience || exp < new Date().getTime() / 1000) {
        return false;
      }

      return true;
    } catch (err) {
      return false;
    }
  }

}
