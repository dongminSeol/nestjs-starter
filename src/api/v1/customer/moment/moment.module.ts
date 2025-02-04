import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AwsS3Module } from '../../../../modules/aws/s3/aws.s3.module';
import { MomentController } from './moment.controller';
import { MomentService } from './moment.service';

@Module({
  imports: [
    AwsS3Module.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        region: configService.get<string>(''),
        publicKey: configService.get<string>(''),
        privateKey: configService.get<string>('')
      })
    })
  ],
  providers: [MomentService],
  controllers: [MomentController]
})
export class MomentModule {}
