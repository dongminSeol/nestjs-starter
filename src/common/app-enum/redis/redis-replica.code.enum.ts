import { Enum, EnumType } from 'ts-jenum';

@Enum('code')
export class RedisReplicaCode extends EnumType<RedisReplicaCode>() {
  static readonly Replication = new RedisReplicaCode('RedisReplicaCode', 'Redis Replication 정보', 0, null, null);
  static readonly Read = new RedisReplicaCode('Read', '읽기', 1, 'RedisReplicaCode', null);
  static readonly Write = new RedisReplicaCode('Write', '쓰기', 2, 'RedisReplicaCode', null);
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
