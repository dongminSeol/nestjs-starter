import { Body, Controller, Delete, Get, Post, Req, UploadedFile } from '@nestjs/common';
import { ACCESS_TOKEN } from '../../../common/app-auth/constant/app-auth.constant';
import { MemberService } from './member.service';
import { MemberV1CheckDuplicateIdRes, MemberV1ProfileRes } from './dto/member.res.dto';
import { AppRequest } from '../../../common/app-request/interface/app-request.interface';
import { MemberV1CheckDuplicateIdReq, MemberV1UpdateProfileReq } from './dto/member.req.dto';
import { AppFileRequiredPipe } from '../../../common/app-file/pipe/app-file.required.pipe';
import { AppFileTypePipe } from '../../../common/app-file/pipe/app-file.type.pipe';
import { AppFileType } from '../../../common/app-file/type/app-file.type';

import { TokenAuth } from '../../../common/app-auth/decorator/app-auth.decorator';
import { AppResponseSerialize } from '../../../common/app-response/decorator/app-response-serialize.decorator';
import { UploadFileSingle } from '../../../common/app-file/decorator/app-file.decorator';
import { AwsS3Service } from '../../../modules/aws/s3/service/aws.s3.service';

@Controller({ path: 'pg/member', version: '1' })
@TokenAuth(ACCESS_TOKEN)
export class MemberController {
  private readonly S3_BUCKET = 'dev-first-repo';
  private readonly S3_BUCKET_PATH = 'developer';
  private readonly S3_BUCKET_URL = 'https://dev-first-repo.s3.ap-northeast-2.amazonaws.com';

  constructor(private readonly memberService: MemberService, private readonly s3Service: AwsS3Service) {
  }


  @Get('/profile')
  @AppResponseSerialize(MemberV1ProfileRes)
  public async profile(@Req() { _id }: AppRequest) {
    return await this.memberService.findById(_id);
  }

  @Post('/profile')
  public async updateProfile(@Req() { _id }: AppRequest, @Body() { user_name, mobile_number, status_message }: MemberV1UpdateProfileReq) {
    return await this.memberService.updateProfile(_id, user_name, mobile_number, status_message);
  }

  @Post('/profile-image')
  @UploadFileSingle('file')
  async uploadProfileImage(@Req() { _id }: AppRequest, @UploadedFile(AppFileRequiredPipe, AppFileTypePipe) file: AppFileType) {
    const { pathWithFileName } = await this.s3Service.putItemInBucket(this.S3_BUCKET, file.originalname, file.buffer, this.S3_BUCKET_PATH);
    return await this.memberService.updateProfileImage(_id, pathWithFileName);
  }

  @Post('/check/duplicate-id')
  @AppResponseSerialize(MemberV1CheckDuplicateIdRes)
  public async checkDuplicateId(@Body() { user_id }: MemberV1CheckDuplicateIdReq) {
    return await this.memberService.checkDuplicateId(user_id);
  }

  @Delete('profile')
  async deleteAccount(@Req() { _id }: AppRequest) {
    await this.memberService.deleteAccount(_id);
  }


}
