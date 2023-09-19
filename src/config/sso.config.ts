import { registerAs } from '@nestjs/config';

export default registerAs(
  'sso',
  (): Record<string, any> => ({
    kakao_login: {
      keyUri: process.env.SSO_KAKAO_KEY_URI,
      issuer: process.env.SSO_KAKAO_ISSUER,
      audience: process.env.SSO_KAKAO_AUDIENCE,
    },
    apple_login: {
      keyUri: process.env.SSO_APPLE_KEY_URI,
      issuer: process.env.SSO_APPLE_ISSUER,
      audience: process.env.SSO_APPLE_AUDIENCE,
    },
    google_login: {
      keyUri: process.env.SSO_GOOGLE_KEY_URI,
      issuer: process.env.SSO_GOOGLE_ISSUER,
      audience: process.env.SSO_GOOGLE_AUDIENCE,
    }
  })
);
