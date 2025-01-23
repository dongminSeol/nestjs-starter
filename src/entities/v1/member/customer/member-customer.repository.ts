import { Inject, Injectable } from '@nestjs/common';
import { PGPoolCode } from '../../../../common/app-enum/postgresql/pg-pool.code.enum';
import { MemberCustomerEntity } from './member-customer.entity';
import { PG_SERVICE } from '../../../../modules/pg/constants/pg.constant';
import { IPGService } from '../../../../modules/pg/interfaces/pg.interface';

@Injectable()
export class MemberCustomerRepository {
  constructor(
    @Inject(PG_SERVICE)
    private readonly pg: IPGService
  ) {}

  async findOneById(id: number) {
    return await this.pg.executeQueryToSingleRow<MemberCustomerEntity>(PGPoolCode.Read.code, {
      text: ``,
      values: [id]
    });
  }
}
