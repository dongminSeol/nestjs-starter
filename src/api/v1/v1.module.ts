import { Module } from '@nestjs/common';
import { AuthV1Module } from "./auth-v1/auth-v1.module";
import { MemberV1Module } from "./member-v1/member-v1.module";

@Module({
  imports: [AuthV1Module,MemberV1Module]
})
export class V1Module {}
