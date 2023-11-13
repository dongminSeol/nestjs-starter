import { Injectable } from '@nestjs/common';
import { PGPool } from '../../../../common/app-enum/postgresql/pg-pool.code.enum';
import { PgBaseRepository } from '../../../../modules/pg/repository/pg.base.repository';
import { MomentContentUserShareEntity } from '../moment.entity';


@Injectable()
export class MomentContentShareRepository extends PgBaseRepository<MomentContentUserShareEntity> {

  public async create(id: number) {
    const params = {
      text: `($1);`,
      values: [id]
    };
    return await this.executeQueryAsSingle(PGPool.Write.code, params);
  }

  public async update(id: number) {
    const params = {
      text: `($1);`,
      values: [id]
    };
    return await this.executeQueryAsSingle(PGPool.Write.code, params);
  }

}
