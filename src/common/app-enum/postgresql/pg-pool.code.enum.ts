import { Enum, EnumType } from 'ts-jenum';

@Enum('code')
export class PGPoolCode extends EnumType<PGPoolCode>() {
  static readonly ConnectionPool = new PGPoolCode('PGConnectionPool', 'Pool 정보', 0, null, null);
  static readonly Read = new PGPoolCode('Read', '읽기', 1, 'PGConnectionPool', null);
  static readonly Write = new PGPoolCode('Write', '쓰기', 2, 'PGConnectionPool', null);
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
