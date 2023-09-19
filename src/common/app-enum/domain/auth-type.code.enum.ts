import { Enum, EnumType } from 'ts-jenum';

@Enum('code')
export class AuthTypeCode extends EnumType<AuthTypeCode>() {
  static readonly AuthType = new AuthTypeCode('AuthType', '권한 정보', 0, null, null);
  static readonly KaKao = new AuthTypeCode('KaKao', '카카오 회원 가입', 1, 'AuthType', null);
  static readonly Apple = new AuthTypeCode('Apple', '애플 회원 가입', 2, 'AuthType', null);
  static readonly Google = new AuthTypeCode('Google', 'Google 회원 가입', 3, 'AuthType', null);
  static readonly Mail = new AuthTypeCode('Mail', 'Mail 회원 가입', 4, 'AuthType', null);
  static readonly MobilePhone = new AuthTypeCode('MobilePhone', 'MobilePhone 회원 가입', 5, 'AuthType', null);
  constructor(
    readonly code: string,
    readonly name: string,
    readonly order: number,
    readonly parentCode: string,
    readonly description: string
  ) {
    super();
  }
}
