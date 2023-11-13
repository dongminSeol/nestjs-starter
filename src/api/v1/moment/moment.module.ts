import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MomentRepositoryModule } from '../../../entities/v1/moment/moment.repository.module';
import { AwsS3Module } from '../../../modules/aws/s3/aws.s3.module';
import { MomentController } from './moment.controller';
import { MomentService } from './moment.service';


@Module({
  imports: [
    MomentRepositoryModule,
    AwsS3Module.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        region: configService.get<string>('aws.s3.region'),
        publicKey: configService.get<string>('aws.s3.publicKey'),
        privateKey: configService.get<string>('aws.s3.privateKey')
      })
    })
  ],
  providers: [
    MomentService
  ],
  controllers: [MomentController]
})
export class MomentModule {}
