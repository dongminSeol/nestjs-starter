import { Injectable } from '@nestjs/common';

import { MomentContentRepository } from '../../../entities/v1/moment/repositories/moment.content.repository';
import { MomentContentGoodRepository } from '../../../entities/v1/moment/repositories/moment.content.good.repository';
import { MomentContentShareRepository } from '../../../entities/v1/moment/repositories/moment.content.share.repository';
import { MomentContentReactionRepository } from '../../../entities/v1/moment/repositories/moment.content.reaction.repository';


@Injectable()
export class MomentService {
  constructor(
    private readonly momentRepository: MomentContentRepository,
    private readonly momentGoodRepository: MomentContentGoodRepository,
    private readonly momentShareRepository: MomentContentShareRepository,
    private readonly momentReactionRepository: MomentContentReactionRepository,
  ) {
  }

  public async createContent() {
    // await this.momentRepository.create()
  }

  public async updateContent() {
    // await this.momentRepository.update();
  }

  public async findContentById() {
    // await this.momentRepository.findById();
  }

  public async findAllContent() {
    // await this.momentRepository.findAll();
  }


}
