import { Enum, EnumType } from 'ts-jenum';

@Enum('code')
export class MongooseConnectionCode extends EnumType<MongooseConnectionCode>() {
  static readonly ConnectionName = new MongooseConnectionCode('MongooseConnectionCode', 'Connection 정보', 0, null, null);
  static readonly Logger = new MongooseConnectionCode('logger', '로그', 1, 'MongooseConnectionCode', null);
  static readonly Dev = new MongooseConnectionCode('dev', '개발', 2, 'MongooseConnectionCode', null);
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
