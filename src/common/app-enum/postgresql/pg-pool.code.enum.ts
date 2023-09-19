import { Enum, EnumType } from 'ts-jenum';

@Enum('code')
export class PGPool extends EnumType<PGPool>() {
  static readonly ConnectionPool = new PGPool('ConnectionPool', 'Pool 정보', 0, null, null);
  static readonly Read = new PGPool('Read', '읽기', 1, 'ConnectionPool', null);
  static readonly Write = new PGPool('Write', '쓰기', 2, 'ConnectionPool', null);
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
