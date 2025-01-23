import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { RedisReplicaCode } from '../../app-enum/redis/redis-replica.code.enum';
import { Redis } from 'ioredis';

@Injectable()
export class AppRedisService {
  constructor(
    @InjectRedis(RedisReplicaCode.Read.code)
    private readonly redisRead: Redis,

    @InjectRedis(RedisReplicaCode.Write.code)
    private readonly redisWrite: Redis
  ) {}

  async get(key: string): Promise<string | null> {
    return this.handleRedis(() => this.redisRead.get(key));
  }

  async set(key: string, value: string, expire = 60): Promise<'OK'> {
    return this.handleRedis(() => this.redisWrite.set(key, value, 'EX', expire));
  }

  async del(key: string): Promise<number> {
    return this.handleRedis(() => this.redisWrite.del(key));
  }

  private async handleRedis<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      throw new Error(`Redis 작업 요청 중 오류가 발생 했습니다.: ${error.message}`);
    }
  }
}
