import { Module } from '@nestjs/common';
import { MemberV1RepositoryModule } from "../../../entities/v1/member-v1/member-v1.repository.module";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [MemberV1RepositoryModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {
}
