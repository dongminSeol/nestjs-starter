import { Enum, EnumType } from 'ts-jenum';

@Enum('code')
export class MemberTypeCode extends EnumType<MemberTypeCode>() {
  static readonly MemberType = new MemberTypeCode('MemberType', '권한 정보', 0, null, null);
  static readonly SuperAdmin = new MemberTypeCode('SuperAdmin', '시스템 관리자', 1, 'MemberType', null);
  static readonly Admin = new MemberTypeCode('Admin', '관리자', 2, 'MemberType', null);
  static readonly User = new MemberTypeCode('User', '사용자', 3, 'MemberType', null);
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
