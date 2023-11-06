import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JobLevel } from '../constant/app-job.enum.constant';
import { AppJobEntity } from '../entity/app-job.entity';
import { Model } from 'mongoose';
import { AppJobLogParams } from '../interface/app-job.interface';

@Injectable()
export class AppJobLogService {
  constructor(
    @InjectModel(AppJobEntity.name)
    private appLogger: Model<AppJobEntity>
  ) {}

  public async debug(params: AppJobLogParams) {
    return await this.appLogger.create({ level: JobLevel.Debug, ...params });
  }

  public async warn(params: AppJobLogParams) {
    return await this.appLogger.create({ level: JobLevel.Warn, ...params });
  }

  public async log(params: AppJobLogParams) {
    return await this.appLogger.create({ level: JobLevel.Log, ...params });
  }

  public async error(params: AppJobLogParams) {
    return await this.appLogger.create({ level: JobLevel.Error, ...params });
  }

  public async verbose(params: AppJobLogParams) {
    return await this.appLogger.create({ level: JobLevel.Verbose, ...params });
  }
}
