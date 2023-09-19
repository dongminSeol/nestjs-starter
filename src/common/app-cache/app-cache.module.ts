import { Module } from '@nestjs/common';
import { AppCacheService } from './service/app-cache.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RedisReplicaCode } from '../app-enum/redis/redis-replica.code.enum';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    RedisModule.forRoot({
      config: [
        {
          namespace: RedisReplicaCode.Read.code,
          host: 'localhost',
          port: 6380,
          db: 0
        },
        {
          namespace: RedisReplicaCode.Write.code,
          host: 'localhost',
          port: 6379,
          db: 0
        }
      ]
    }),
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        config: [
          {
            namespace: RedisReplicaCode.Read.code,
            host: config.get<string>('cache.redis.read.host'),
            port: config.get<number>('cache.redis.read.host'),
            db: config.get<number>('cache.redis.read.db'),
          },
          {
            namespace: RedisReplicaCode.Write.code,
            host: config.get<string>('cache.redis.write.host'),
            port: config.get<number>('cache.redis.write.host'),
            db: config.get<number>('cache.redis.write.db'),
          },
        ]
      })
    })
  ],
  providers: [AppCacheService],
  exports: [AppCacheService]
})
export class AppCacheModule {
}
