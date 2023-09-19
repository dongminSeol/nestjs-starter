import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { RedisReplicaCode } from '../../app-enum/redis/redis-replica.code.enum';
import { Redis } from 'ioredis';

@Injectable()
export class AppCacheService {
  constructor(
    @InjectRedis(RedisReplicaCode.Read.code)
    private readonly redisRead: Redis,
    @InjectRedis(RedisReplicaCode.Write.code)
    private readonly redisWrite: Redis
  ) {
  }

  private async getRedis(key: string): Promise<string> {
    try {
      return await this.redisRead.get(key);
    } catch (err) {
      throw Error(err);
    }
  }

  private async setRedis(key: string, value: string, expire?: number): Promise<'OK'> {
    try {
      return this.redisWrite.set(key, value, 'EX', expire ?? 10);
    } catch (err) {
      throw Error(err);
    }
  }

  private async delRedis(key: string): Promise<number> {
    try {
      return this.redisWrite.del(key);
    } catch (err) {
      throw Error(err);
    }
  }

  public async getAccessToken(id: number): Promise<string> {
    return await this.getRedis(`access:${id}`);
  }

  public async getRefreshToken(id: number): Promise<string> {
    return await this.getRedis(`refresh:${id}`);
  }

  public async setAccessToken(id: number, value: string, expire?: number) {
    return await this.setRedis(`access:${id}`, value, expire);
  }

  public async setRefreshToken(id: number, value: string, expire?: number) {
    return await this.setRedis(`refresh:${id}`, value, expire);
  }

  public async delAccessToken(id: number) {
    return await this.delRedis(`access:${id}`);
  }

  public async delRefreshToken(id: number) {
    return await this.delRedis(`refresh:${id}`);
  }

  public async getOTPCode(key: string) {
    return await this.getRedis(`opt:${key}`);
  }

  public async setOTPCode(key: string, optCode: string, expire?: number) {
    return await this.setRedis(`opt:${key}`, optCode, expire);
  }

  public async delOTPCode(key: string) {
    return await this.delRedis(`opt:${key}`);
  }

  public async getActiveUser(id: number) {
    return await this.getRedis(`active_user:${id}`);
  }

  public async setActiveUser(id: number, isActive: boolean, expire?: number) {
    return await this.setRedis(`active_user:${id}`, JSON.stringify({ isActive: isActive }), expire);
  }

  public async delActiveUser(id: number) {
    return await this.delRedis(`active_user:${id}`);
  }

  public refreshActiveUserExpiration(id: number, expire ?: number) {
    return this.redisWrite.expire(`active_user:${id}`, expire);
  }


}
