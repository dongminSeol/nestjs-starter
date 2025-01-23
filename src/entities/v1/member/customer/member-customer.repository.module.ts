import { Module } from '@nestjs/common';
import { MemberCustomerRepository } from './member-customer.repository';

@Module({
  providers: [MemberCustomerRepository],
  exports: [MemberCustomerRepository]
})
export class MemberCustomerRepositoryModule {}
