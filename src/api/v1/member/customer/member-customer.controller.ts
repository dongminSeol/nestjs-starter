import { Body, Controller, Delete, Get, Post, Req, UploadedFile } from '@nestjs/common';
import { ACCESS_TOKEN } from '../../../../common/app-auth/constants/app-auth.constant';
import { MemberService } from '../member.service';
import { AppRequest } from '../../../../common/app-request/interfaces/app-request.interface';
import { AppFileRequiredPipe } from '../../../../common/app-file/pipes/app-file.required.pipe';
import { AppFileTypePipe } from '../../../../common/app-file/pipes/app-file.type.pipe';
import { AppFileType } from '../../../../common/app-file/types/app-file.type';
import { UploadFileSingle } from '../../../../common/app-file/decorators/app-file.decorator';
import { AppJwtAuth } from '../../../../common/app-auth/decorators/app-jwt.decorator';

@Controller({ path: 'member', version: '1' })
@AppJwtAuth(ACCESS_TOKEN)
export class MemberCustomerController {
  constructor(private readonly memberService: MemberService) {}

  @Get('/profile')
  async profile(@Req() { _id }: AppRequest) {
    return await this.memberService.findById(_id);
  }

  @Post('/profile')
  async updateProfile(@Req() { _id }: AppRequest, @Body() body : any) {
  }

  @Post('/profile-image')
  @UploadFileSingle('file')
  async uploadProfileImage(@Req() { _id }: AppRequest, @UploadedFile(AppFileRequiredPipe, AppFileTypePipe) file: AppFileType) {
  }
}
