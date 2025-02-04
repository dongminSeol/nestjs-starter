import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { SingInRequestDto } from './dto/request/sing-in.request.dto';
import { SingUpRequestDto } from './dto/request/sing-up.request.dto';
import { AppJwtAuth } from '../../../../common/app-auth/decorators/app-jwt.decorator';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../../common/app-auth/constants/app-auth.constant';
import { AppRequest } from '../../../../common/app-request/interfaces/app-request.interface';
import { AuthService } from './auth.service';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() body: SingInRequestDto) {}

  @Post('sign-up')
  async signUp(@Body() body: SingUpRequestDto) {}

  @Post('logout')
  @AppJwtAuth(ACCESS_TOKEN)
  async logout(@Req() { _id }: AppRequest) {}

  @Get('me')
  @AppJwtAuth(ACCESS_TOKEN)
  async me() {

  }
}
