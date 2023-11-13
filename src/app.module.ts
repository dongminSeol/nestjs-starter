import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { V1Module } from './api/v1/v1.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseConnectionNameCode } from './common/app-enum/mongoose/connection-name.code.enum';
import { CommonModule } from './common/common.module';
import { PGModule } from './modules/pg/pg.module';
import { ConfigService } from '@nestjs/config';
import { PGPool } from "./common/app-enum/postgresql/pg-pool.code.enum";

@Module({
  imports: [
    CommonModule,
    PGModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        config: [
          {
            poolName: PGPool.Read.code,
            connectionString: configService.get<string>('pg.read.connectionString'),
            connectionTimeoutMillis: configService.get<number>('pg.read.connectionTimeoutMillis'),
            max: configService.get<number>('pg.read.max')
          },
          {
            poolName: PGPool.Write.code,
            connectionString: configService.get<string>('pg.write.connectionString'),
            connectionTimeoutMillis: configService.get<number>('pg.write.connectionTimeoutMillis'),
            max: configService.get<number>('pg.read.max')
          }
        ]
      }),
    }),
    MongooseModule.forRootAsync({
      connectionName: MongooseConnectionNameCode.Dev.code,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoose.db.uri'),
        maxPoolSize: configService.get<number>('mongoose.db.maxPoolSize')
      })
    }),
    V1Module
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
