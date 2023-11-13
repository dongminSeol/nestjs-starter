import { Module } from '@nestjs/common';
import { MemberRepository } from './repositories/member.repository';


@Module({
  providers: [MemberRepository],
  exports: [MemberRepository]
})
export class MemberRepositoryModule {
}
