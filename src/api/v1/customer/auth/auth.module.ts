import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CustomerRepositoryModule } from './repository/customer.repository.module';
import { CustomerRepository } from './repository/customer.repository';

@Module({
  imports: [CustomerRepositoryModule],
  providers: [CustomerRepository],
  controllers: [AuthController]
})
export class AuthModule {}
