import { Module } from '@nestjs/common';
import { MemberRepositoryModule } from "../../../entities/v1/member/member.repository.module";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [MemberRepositoryModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {
}
