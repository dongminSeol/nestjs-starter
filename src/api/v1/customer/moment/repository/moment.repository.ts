import { Inject, Injectable } from '@nestjs/common';
import { PG_SERVICE } from '../../../../../modules/pg/constants/pg.constant';
import { IPGService } from '../../../../../modules/pg/interfaces/pg.interface';
import { MomentEntity } from './moment.entity';
import { PGPoolCode } from '../../../../../common/app-enum/postgresql/pg-pool.code.enum';

@Injectable()
export class MomentRepository {
  constructor(
    @Inject(PG_SERVICE)
    private readonly pg: IPGService
  ) {}

  async findOneById(id: number) {
    return await this.pg.executeQueryToSingleRow<MomentEntity>(PGPoolCode.Read.code, {
      text: ``,
      values: [id]
    });
  }

  async findAll() {}
}
