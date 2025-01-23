import { Enum, EnumType } from 'ts-jenum';

@Enum('code')
export class LoginCode extends EnumType<LoginCode>() {
  static readonly AuthType = new LoginCode('LoginCode', '권한 정보', 0, null, null);
  static readonly KaKao = new LoginCode('KaKao', '카카오 회원 가입', 1, 'LoginCode', null);
  static readonly Apple = new LoginCode('Apple', '애플 회원 가입', 2, 'LoginCode', null);
  static readonly Google = new LoginCode('Google', 'Google 회원 가입', 3, 'LoginCode', null);
  static readonly Mail = new LoginCode('Mail', 'Mail 회원 가입', 4, 'LoginCode', null);
  static readonly MobilePhone = new LoginCode('MobilePhone', 'MobilePhone 회원 가입', 5, 'LoginCode', null);
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
