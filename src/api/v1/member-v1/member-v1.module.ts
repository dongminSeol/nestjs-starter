import { Module } from '@nestjs/common';
import { MemberV1RepositoryModule } from "../../../modules/entities/v1/member-v1/member-v1.repository.module";
import { MemberV1Controller } from './member-v1.controller';
import { MemberV1Service } from './member-v1.service';
import { AwsS3Module } from '../../../modules/aws/s3/aws.s3.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MemberV1RepositoryModule,
    AwsS3Module.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        region: configService.get<string>('aws.dynamo.region'),
        publicKey: configService.get<string>('aws.dynamo.publicKey'),
        privateKey: configService.get<string>('aws.dynamo.privateKey')
      })
    })
  ],
  providers: [MemberV1Service],
  controllers: [MemberV1Controller]
})
export class MemberV1Module {
}
