import { Injectable } from '@nestjs/common';
import { MemberCustomerRepository } from '../../../entities/v1/member/customer/member-customer.repository';
import { AwsS3Service } from '../../../modules/aws/s3/service/aws.s3.service';

@Injectable()
export class MemberService {
  private readonly S3_BUCKET = 'dev-first-repo';
  private readonly S3_BUCKET_PATH = 'developer';
  private readonly S3_BUCKET_URL = 'https://dev-first-repo.s3.ap-northeast-2.amazonaws.com';
  constructor(private readonly customerRepository: MemberCustomerRepository, private readonly s3Service: AwsS3Service) {}

  async findById(id: number) {}

  async updateProfile(id: number, nickName: string, phone: string, message: string) {}

  async updateProfileImage(id: number, imagePath: string) {}
}
