import { Module } from '@nestjs/common';
import { MemberV1Repository } from './member-v1.repository';


@Module({
  providers: [MemberV1Repository],
  exports: [MemberV1Repository]
})
export class MemberV1RepositoryModule {
}
