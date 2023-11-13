import { Injectable } from '@nestjs/common';
import { MemberRepository } from "../../../entities/v1/member/repositories/member.repository";

@Injectable()
export class AuthService {
  constructor(private readonly memberRepository: MemberRepository) {
  }
  public async loginWithSSO(provider: string, payload: Record<string, any>) {
    const ssoAccountInfo = await this.memberRepository.findAccountByOpenId(payload?.sub);

    if (!ssoAccountInfo) {
      return await this.memberRepository.createAccount(provider, payload);
    }

    return ssoAccountInfo;
  }

}
