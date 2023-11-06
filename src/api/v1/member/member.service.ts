import { Injectable } from '@nestjs/common';
import { MemberRepository } from "../../../entities/v1/member/member.repository";

@Injectable()
export class MemberService {
  constructor(private readonly memberV1Repository: MemberRepository) {}

  public async findById(id: number) {
    return await this.memberV1Repository.findAccountById(id);
  }

  public async checkDuplicateId(userId: string) {
    const result = await this.memberV1Repository.findAccountByUserId(userId);

    return {
      isDuplicate: !!result
    }
  }

  public async updateProfile(id: number, userName: string, mobileNumber: string, statusMessage: string) {
    return await this.memberV1Repository.updateProfile(id, userName, mobileNumber, statusMessage);
  }

  public async updateProfileImage(id: number, imagePath: string) {
    return await this.memberV1Repository.updateProfileImage(id, imagePath);
  }

  public async deleteAccount(id: number) {
    return await this.memberV1Repository.deleteAccount(id);
  }


}
