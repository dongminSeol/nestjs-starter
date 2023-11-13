import { Module } from '@nestjs/common';
import { MomentContentGoodRepository } from './repositories/moment.content.good.repository';
import { MomentContentReactionRepository } from './repositories/moment.content.reaction.repository';
import { MomentContentRepository } from './repositories/moment.content.repository';
import { MomentContentShareRepository } from './repositories/moment.content.share.repository';


@Module({
  providers: [
    MomentContentRepository,
    MomentContentGoodRepository,
    MomentContentShareRepository,
    MomentContentReactionRepository
  ],
  exports: [
    MomentContentRepository,
    MomentContentGoodRepository,
    MomentContentShareRepository,
    MomentContentReactionRepository
  ]
})
export class MomentRepositoryModule {
}
