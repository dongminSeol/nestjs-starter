import { IsNotEmpty, IsString } from 'class-validator';

export class AuthV1SendOTPCodeReq {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  countryCode: string;
}

export class AuthV1SSOReq {
  @IsString()
  @IsNotEmpty()
  idToken: string;
}
