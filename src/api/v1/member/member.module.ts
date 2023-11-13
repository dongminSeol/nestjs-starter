import { Module } from '@nestjs/common';
import { MemberRepositoryModule } from "../../../entities/v1/member/member.repository.module";
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { AwsS3Module } from '../../../modules/aws/s3/aws.s3.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MemberRepositoryModule,
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
    MemberService
  ],
  controllers: [MemberController]
})
export class MemberModule {
}
