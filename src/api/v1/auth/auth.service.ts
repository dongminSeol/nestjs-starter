import { Injectable } from '@nestjs/common';
import { MemberV1Repository } from "../../../entities/v1/member-v1/member-v1.repository";

@Injectable()
export class AuthService {
  constructor(private readonly memberV1Repository: MemberV1Repository) {
  }
  public async loginWithSSO(provider: string, payload: Record<string, any>) {
    const ssoAccountInfo = await this.memberV1Repository.findAccountByOpenId(payload?.sub);

    if (!ssoAccountInfo) {
      return await this.memberV1Repository.createAccount(provider, payload);
    }

    return ssoAccountInfo;
  }

}
