import { Body, Controller, Post, Req } from '@nestjs/common';
import { SSOAuth, TokenAuth } from '../../../common/app-auth/decorator/app-auth.decorator';
import { AppResponseSerialize } from '../../../common/app-response/decorator/app-response-serialize.decorator';
import { AppAuthService } from '../../../common/app-auth/service/app-auth.service';
import { AuthV1RefreshTokenRes } from './dto/auth.res.dto';
import { AppRequest } from '../../../common/app-request/interface/app-request.interface';
import { AuthV1SendOTPCodeReq } from './dto/auth.req.dto';
import { AuthService } from './auth.service';
import { AuthTypeCode } from '../../../common/app-enum/domain/auth-type.code.enum';
import {
  ACCESS_TOKEN,
  APPLE_LOGIN,
  GOOGLE_LOGIN,
  KAKAO_LOGIN, REFRESH_TOKEN
} from '../../../common/app-auth/constant/app-auth.constant';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly appAuthService: AppAuthService,
    private readonly authV1Service: AuthService
  ) {
  }

  @Post('logout')
  @TokenAuth(ACCESS_TOKEN)
  public async logout(@Req() { _id }: AppRequest) {
    return await this.appAuthService.deleteTokens(_id);
  }

  @Post('/refresh-token')
  @TokenAuth(REFRESH_TOKEN)
  @AppResponseSerialize(AuthV1RefreshTokenRes)
  public async refreshToken(@Req() { _id }: AppRequest) {

    const newAccessToken = await this.appAuthService.generateAccessToken(_id);
    const newRefreshToken = await this.appAuthService.generateRefreshToken(_id);

    return {
      id: _id,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    };
  }

  @Post('/kakao/login')
  @SSOAuth(KAKAO_LOGIN)
  public async loginWithKaKao(@Req() { _payload }: AppRequest) {

    const { id, is_completed } = await this.authV1Service.loginWithSSO(AuthTypeCode.KaKao.code, _payload);

    const accessToken = await this.appAuthService.generateAccessToken(id);
    const refreshToken = await this.appAuthService.generateRefreshToken(id);

    return {
      id: id,
      isCompleted: is_completed,
      accessToken: accessToken,
      refreshToken: refreshToken
    };
  }


  @Post('/google/login')
  @SSOAuth(GOOGLE_LOGIN)
  public async loginWithGoogle(@Req() { _payload }: AppRequest) {

    const { id, is_completed } = await this.authV1Service.loginWithSSO(AuthTypeCode.Google.code, _payload);

    const accessToken = await this.appAuthService.generateAccessToken(id);
    const refreshToken = await this.appAuthService.generateRefreshToken(id);

    return {
      id: id,
      isCompleted: is_completed,
      accessToken: accessToken,
      refreshToken: refreshToken
    };
  }

  @Post('/apple/login')
  @SSOAuth(APPLE_LOGIN)
  public async loginWithApple(@Req() { _payload }: AppRequest) {

    const { id, is_completed } = await this.authV1Service.loginWithSSO(AuthTypeCode.Apple.code, _payload);

    const accessToken = await this.appAuthService.generateAccessToken(id);
    const refreshToken = await this.appAuthService.generateRefreshToken(id);

    return {
      id: id,
      isCompleted: is_completed,
      accessToken: accessToken,
      refreshToken: refreshToken
    };
  }


  @Post('/verify-phone')
  @TokenAuth(ACCESS_TOKEN)
  public async sendOTPCode(@Req() { _id }: AppRequest, @Body() {
    countryCode,
    phoneNumber
  }: AuthV1SendOTPCodeReq) {
    const codeKey = `${_id}_${countryCode}_${phoneNumber}`;
    const otpCode = await this.appAuthService.generateOTPCode(codeKey);

    // this.sms.send(`${countryCode}_${phoneNumber}`, `인증번호: ${otpCode}`)

    return {
      otpCode: otpCode
    };

  }

}
