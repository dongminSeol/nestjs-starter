import { Injectable } from '@nestjs/common';
import { MemberRepository } from "../../../entities/v1/member/repositories/member.repository";

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  public async findById(id: number) {
    return await this.memberRepository.findAccountById(id);
  }

  public async checkDuplicateId(userId: string) {
    const result = await this.memberRepository.findAccountByUserId(userId);

    return {
      isDuplicate: !!result
    }
  }

  public async updateProfile(id: number, userName: string, mobileNumber: string, statusMessage: string) {
    return await this.memberRepository.updateProfile(id, userName, mobileNumber, statusMessage);
  }

  public async updateProfileImage(id: number, imagePath: string) {
    return await this.memberRepository.updateProfileImage(id, imagePath);
  }

  public async deleteAccount(id: number) {
    return await this.memberRepository.deleteAccount(id);
  }


}
