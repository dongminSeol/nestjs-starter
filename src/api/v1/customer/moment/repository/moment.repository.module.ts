import { Module } from '@nestjs/common';
import { MomentRepository } from './moment.repository';

@Module({
  providers: [MomentRepository],
  exports: [MomentRepository]
})
export class MomentRepositoryModule {}
