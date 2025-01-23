import { Injectable } from '@nestjs/common';
import { AppAuthConfigService } from '../../../common/app-auth/services/app-auth.config.service';

@Injectable()
export class AuthService {
  constructor(private readonly appAuthConfigService: AppAuthConfigService) {}

  generateJwtTokens(id: number, roleCode: string) {
    const accessToken = this.appAuthConfigService.generateAccessToken({ id, roleCode });
    const refreshToken = this.appAuthConfigService.generateRefreshToken({ id, roleCode });

    return { accessToken, refreshToken };
  }
}
