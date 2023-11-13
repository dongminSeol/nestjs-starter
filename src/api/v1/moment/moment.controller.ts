import { Controller, Post, Put, Get } from '@nestjs/common';
import { TokenAuth } from '../../../common/app-auth/decorator/app-auth.decorator';

import { ACCESS_TOKEN } from '../../../common/app-auth/constant/app-auth.constant';
import { MomentService } from './moment.service';


@TokenAuth(ACCESS_TOKEN)
@Controller({ path: '/moment', version: '1' })
export class MomentController {
  constructor(private readonly momentService: MomentService) {
  }

  @Post('content')
  public async createContent() {

  }

  @Put('content')
  public async updateContent(){

  }

  @Get('/content/:id')
  public async findContentById() {

  }

}
