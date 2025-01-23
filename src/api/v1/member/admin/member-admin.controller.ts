import { Controller } from '@nestjs/common';
import { ACCESS_TOKEN } from '../../../../common/app-auth/constants/app-auth.constant';
import { MemberService } from '../member.service';
import { AwsS3Service } from '../../../../modules/aws/s3/service/aws.s3.service';
import { AppJwtAuth } from '../../../../common/app-auth/decorators/app-jwt.decorator';

@Controller({ path: 'admin/member', version: '1' })
@AppJwtAuth(ACCESS_TOKEN)
export class MemberAdminController {
  constructor(private readonly memberService: MemberService, private readonly s3Service: AwsS3Service) {}
}
