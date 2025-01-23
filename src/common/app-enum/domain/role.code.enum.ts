import { Enum, EnumType } from 'ts-jenum';

@Enum('code')
export class RoleCode extends EnumType<RoleCode>() {
  static readonly MemberType = new RoleCode('RoleCode', '권한 정보', 0, null, null);
  static readonly SuperAdmin = new RoleCode('SUPER_ADMIN', '시스템 관리자', 1, 'RoleCode', null);
  static readonly Admin = new RoleCode('ADMIN', '관리자', 2, 'RoleCode', null);
  static readonly User = new RoleCode('CUSTOMER', '사용자', 3, 'RoleCode', null);
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
