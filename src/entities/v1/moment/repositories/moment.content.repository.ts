import { Injectable } from '@nestjs/common';
import { PGPool } from '../../../../common/app-enum/postgresql/pg-pool.code.enum';
import { PgBaseRepository } from '../../../../modules/pg/repository/pg.base.repository';
import { MomentContentEntity } from '../moment.entity';


@Injectable()
export class MomentContentRepository extends PgBaseRepository<MomentContentEntity> {

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

  public async findById(id: number) {
    const params = {
      text: `($1);`,
      values: [id]
    };
    return await this.executeQueryAsSingle(PGPool.Read.code, params);
  }

  public async findAll() {
    const params = {
      text: `($1);`,
      values: []
    };
    return await this.executeQueryAsList(PGPool.Read.code, params);
  }

}
