import { Controller } from '@nestjs/common';
import { ACCESS_TOKEN } from '../../../../common/app-auth/constants/app-auth.constant';
import { AppJwtAuth } from '../../../../common/app-auth/decorators/app-jwt.decorator';
import { MomentService } from './moment.service';

@Controller({ path: 'moment', version: '1' })
@AppJwtAuth(ACCESS_TOKEN)
export class MomentController {
  constructor(private readonly momentService: MomentService) {}
}
