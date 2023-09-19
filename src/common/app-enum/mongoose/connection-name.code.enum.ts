import { Enum, EnumType } from 'ts-jenum';

@Enum('code')
export class MongooseConnectionNameCode extends EnumType<MongooseConnectionNameCode>() {
  static readonly ConnectionName = new MongooseConnectionNameCode('ConnectionName', 'Connection 정보', 0, null, null);
  static readonly Logger = new MongooseConnectionNameCode('logger', '로그', 1, 'ConnectionName', null);
  static readonly Dev = new MongooseConnectionNameCode('dev', '개발', 2, 'ConnectionName', null);
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
