import { Inject, Injectable } from '@nestjs/common';
import { PG_SERVICE } from '../../../../../modules/pg/constants/pg.constant';
import { IPGService } from '../../../../../modules/pg/interfaces/pg.interface';
import { CustomerEntity } from './customer.entity';
import { PGPoolCode } from '../../../../../common/app-enum/postgresql/pg-pool.code.enum';

@Injectable()
export class CustomerRepository {
  constructor(
    @Inject(PG_SERVICE)
    private readonly pg: IPGService
  ) {}

  async findOneById(id: number) {
    return await this.pg.executeQueryToSingleRow<CustomerEntity>(PGPoolCode.Read.code, {
      text: `select * from live.member where id=$1`,
      values: [id]
    });
  }
}
