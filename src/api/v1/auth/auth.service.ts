import { Injectable } from '@nestjs/common';
import { MemberRepository } from "../../../entities/v1/member/member.repository";

@Injectable()
export class AuthService {
  constructor(private readonly memberV1Repository: MemberRepository) {
  }
  public async loginWithSSO(provider: string, payload: Record<string, any>) {
    const ssoAccountInfo = await this.memberV1Repository.findAccountByOpenId(payload?.sub);

    if (!ssoAccountInfo) {
      return await this.memberV1Repository.createAccount(provider, payload);
    }

    return ssoAccountInfo;
  }

}
