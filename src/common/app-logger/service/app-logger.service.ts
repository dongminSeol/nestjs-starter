import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AppLoggerEntity } from '../entity/app-logger.entity';
import { Model } from 'mongoose';
import { AppLogLevel } from '../constant/app-logger.enum.constant';
import { AppLoggerParams } from '../interface/app-logger-params.interface';

@Injectable()
export class AppLoggerService {
  constructor(
    @InjectModel(AppLoggerEntity.name)
    private appLogger: Model<AppLoggerEntity>
  ) {}

  public async debug(params: AppLoggerParams) {
    return await this.appLogger.create({ level: AppLogLevel.Debug, ...params });
  }

  public async warn(params: AppLoggerParams) {
    return await this.appLogger.create({ level: AppLogLevel.Warn, ...params });
  }

  public async log(params: AppLoggerParams) {
    return await this.appLogger.create({ level: AppLogLevel.Log, ...params });
  }

  public async error(params: AppLoggerParams) {
    return await this.appLogger.create({ level: AppLogLevel.Error, ...params });
  }

  public async verbose(params: AppLoggerParams) {
    return await this.appLogger.create({ level: AppLogLevel.Verbose, ...params });
  }
}
