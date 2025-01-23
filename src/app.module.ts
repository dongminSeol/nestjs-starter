import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { CommonModule } from './common/common.module';
import { PGModule } from './modules/pg/pg.module';
import { ConfigService } from '@nestjs/config';
import { PGPoolCode } from './common/app-enum/postgresql/pg-pool.code.enum';

@Module({
  imports: [
    CommonModule,
    ApiModule,
    PGModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        config: [
          {
            poolName: PGPoolCode.Read.code,
            connectionString: configService.get<string>('pg.read.connectionString'),
            connectionTimeoutMillis: configService.get<number>('pg.read.connectionTimeoutMillis'),
            max: configService.get<number>('pg.read.max')
          },
          {
            poolName: PGPoolCode.Write.code,
            connectionString: configService.get<string>('pg.write.connectionString'),
            connectionTimeoutMillis: configService.get<number>('pg.write.connectionTimeoutMillis'),
            max: configService.get<number>('pg.read.max')
          }
        ]
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
