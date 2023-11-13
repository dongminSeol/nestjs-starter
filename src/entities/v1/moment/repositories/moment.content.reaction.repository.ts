import { Injectable } from '@nestjs/common';
import { PgBaseRepository } from '../../../../modules/pg/repository/pg.base.repository';
import { PGPool } from '../../../../common/app-enum/postgresql/pg-pool.code.enum';
import { MomentContentReactionEntity } from '../moment.entity';


@Injectable()
export class MomentContentReactionRepository extends PgBaseRepository<MomentContentReactionEntity>{

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

  public async count(id: number) {
    const params = {
      text: `($1);`,
      values: [id]
    };
    return await this.executeQueryAsSingle(PGPool.Read.code, params);
  }

}
