import { Module } from '@nestjs/common';
import { MemberCustomerRepositoryModule } from '../../../entities/v1/member/customer/member-customer.repository.module';
import { MemberCustomerController } from './customer/member-customer.controller';
import { MemberService } from './member.service';
import { AwsS3Module } from '../../../modules/aws/s3/aws.s3.module';
import { ConfigService } from '@nestjs/config';
import { MemberAdminController } from './admin/member-admin.controller';

@Module({
  imports: [
    MemberCustomerRepositoryModule,
    AwsS3Module.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        region: configService.get<string>('aws.dynamo.region'),
        publicKey: configService.get<string>('aws.dynamo.publicKey'),
        privateKey: configService.get<string>('aws.dynamo.privateKey')
      })
    })
  ],
  providers: [MemberService],
  controllers: [MemberCustomerController, MemberAdminController]
})
export class MemberModule {}
