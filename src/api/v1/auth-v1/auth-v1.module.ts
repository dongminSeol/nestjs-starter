import { Module } from '@nestjs/common';
import { MemberV1RepositoryModule } from "../../../modules/entities/v1/member-v1/member-v1.repository.module";
import { AuthV1Controller } from './auth-v1.controller';
import { AuthV1Service } from './auth-v1.service';

@Module({
  imports: [MemberV1RepositoryModule],
  providers: [AuthV1Service],
  controllers: [AuthV1Controller]
})
export class AuthV1Module {
}
