import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RedisReplicaCode } from '../app-enum/redis/redis-replica.code.enum';
import { ConfigService } from '@nestjs/config';
import { AppRedisService } from './services/app-redis.service';

@Module({
  imports: [
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        config: [
          {
            namespace: RedisReplicaCode.Read.code,
            host: config.get<string>('cache.redis.read.host'),
            port: config.get<number>('cache.redis.read.host'),
            db: config.get<number>('cache.redis.read.db')
          },
          {
            namespace: RedisReplicaCode.Write.code,
            host: config.get<string>('cache.redis.write.host'),
            port: config.get<number>('cache.redis.write.host'),
            db: config.get<number>('cache.redis.write.db')
          }
        ]
      })
    })
  ],
  providers: [AppRedisService],
  exports: [AppRedisService]
})
export class AppCacheModule {}
