import { Module } from '@nestjs/common';
import { AuthModule } from "./auth/auth.module";
import { MemberModule } from "./member/member.module";
import { MomentModule } from './moment/moment.module';

@Module({
  imports: [
    AuthModule,
    MemberModule,
    MomentModule
  ]
})
export class V1Module {}
