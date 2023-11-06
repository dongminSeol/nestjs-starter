import { Module } from '@nestjs/common';
import { AppJobEntity, AppJobSchema } from './entity/app-job.entity';
import { AppJobLogService } from './service/app-job.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://test:test_1024@localhost:27017/',
      {
        maxPoolSize: 50
      }),
    MongooseModule.forFeature([{ name: AppJobEntity.name, schema: AppJobSchema }])
  ],
  providers: [
    AppJobLogService
  ],
  exports: [AppJobLogService]
})
export class AppLoggerModule {
}
