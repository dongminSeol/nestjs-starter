import { Expose } from 'class-transformer';

export class AuthV1RefreshTokenRes {
  @Expose()
  id: number;

  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
