import { Injectable } from '@nestjs/common';
import { PgService } from '../../../modules/pg/service/pg.service';
import { PGPool } from '../../../common/app-enum/postgresql/pg-pool.code.enum';
import { AccountEntity } from './member-v1.entity';


@Injectable()
export class MemberV1Repository {
  constructor(private readonly pg: PgService) {
  }

  public async findAccountById(id: number) {
    const params = {
      text: `select * from live.fn_v1_find_account($1);`,
      values: [id]
    };
    return await this.pg.executeQueryAsSingle<AccountEntity>(PGPool.Read.code, params);
  }

  public async findAccountByOpenId(openId : string) {
    const params = {
      text: `select * from live.fn_v1_find_sso_account($1);`,
      values: [openId]
    };
    return await this.pg.executeQueryAsSingle<AccountEntity>(PGPool.Read.code, params);
  }

  public async findAccountByUserId(userId: string) {
    const params = {
      text: `select * from live.fn_v1_find_sso_account($1);`,
      values: [userId]
    };
    return await this.pg.executeQueryAsSingle<AccountEntity>(PGPool.Read.code, params);
  }

  public async createAccount(provider: string, payload: Record<string, any>) {
    const params = {
      text: `call live.sp_v1_create_sso_account($1, $2, $3, $4, $5, 0, 0, '');`,
      values: [provider, payload?.iss, payload?.aud, payload?.sub, payload?.phone_number || '']
    };

    const result = await this.pg.executeQueryAsSingle<AccountEntity & { message: string }>(PGPool.Read.code, params);
    if (!result?.id) {
      throw new Error(`message: ${result?.message}`);
    }

    return result;
  }

  public async updateProfile(id: number, userName: string, mobileNumber: string ,statusMessage: string) {
    const params = {
      text: ``,
      values: [id, userName, mobileNumber ,statusMessage]
    };

    const result = await this.pg.executeQueryAsSingle<AccountEntity & { message: string }>(PGPool.Write.code, params);
  }

  public async updateProfileImage(id: number, imagePath: string) {
    const params = {
      text: ``,
      values: [id, imagePath]
    };

    const result = await this.pg.executeQueryAsSingle<AccountEntity & { message: string }>(PGPool.Write.code, params);
  }

  public async deleteAccount(id: number) {
    const params = {
      text: `call live.sp_v1_delete_account($1, 0, 0, '');`,
      values: [id]
    };

    const result = await this.pg.executeQueryAsSingle<AccountEntity & { message: string }>(PGPool.Write.code, params);

    if (!result?.id) {
      throw new Error(`message: ${result?.message}`);
    }

    return result;
  }

}
