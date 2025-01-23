import { Module } from '@nestjs/common';
import MongooseConfig from '../config/mongoose.config';
import { AppLoggerModule } from './app-logger/app-logger.module';
import { AppResponseModule } from './app-response/app-response.module';
import { AppRequestModule } from './app-request/app-request.module';
import { HttpModule } from '@nestjs/axios';
import { AppAuthModule } from './app-auth/app-auth.module';
import { ConfigModule } from '@nestjs/config';
import AppConfig from '../config/app.config';
import PgConfig from '../config/pg.config';
import RedisConfig from '../config/redis.config';
import SSOConfig from '../config/sso.config';
import AwsConfig from '../config/aws.config';

import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: `.env.local`,
      load: [AppConfig, PgConfig, RedisConfig, SSOConfig, AwsConfig, MongooseConfig],
      expandVariables: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),

        APP_HTTP_PROTOCOL_TIME_OUT: Joi.number().required().messages({ required: ' APP_HTTP_PROTOCOL_TIME_OUT' }),

        APP_LOGGER_MONGO_URI: Joi.string().required().messages({ required: ' APP_LOGGER_MONGO_URI' }),
        APP_LOGGER_MAX_POOL_SIZE: Joi.number().required().messages({ required: ' APP_LOGGER_MAX_POOL_SIZE' }),

        APP_REQUEST_TIME_OUT: Joi.number().required().messages({ required: ' APP_REQUEST_TIME_OUT' }),
        APP_REQUEST_RETRY_COUNT: Joi.number().required().messages({ required: ' APP_REQUEST_RETRY_COUNT' }),

        APP_API_KEY: Joi.string().required().messages({ required: ' APP_API_KEY' }),

        APP_JWT_ACCESS_TOKEN_SECRET_KEY: Joi.string().required().messages({ required: ' APP_JWT_ACCESS_TOKEN_SECRET_KEY' }),
        APP_JWT_ACCESS_TOKEN_EXPIRED: Joi.number().required().messages({ required: ' APP_JWT_ACCESS_TOKEN_EXPIRED' }),

        APP_JWT_REFRESH_TOKEN_SECRET_KEY: Joi.string().required().messages({ required: ' APP_JWT_REFRESH_TOKEN_SECRET_KEY' }),
        APP_JWT_REFRESH_TOKEN_EXPIRED: Joi.number().required().messages({ required: ' APP_JWT_REFRESH_TOKEN_EXPIRED' }),

        MONGOOSE_DB_URI: Joi.string().required().messages({ required: ' MONGOOSE_DB_URI' }),
        MONGOOSE_DB_MAX_POOL_SIZE: Joi.number().required().messages({ required: ' MONGOOSE_DB_MAX_POOL_SIZE' }),

        REDIS_READ_HOST: Joi.string().required().messages({ required: ' REDIS_READ_HOST' }),
        REDIS_READ_PORT: Joi.number().required().messages({ required: ' REDIS_READ_PORT' }),

        REDIS_WRITE_HOST: Joi.string().required().messages({ required: ' REDIS_WRITE_HOST' }),
        REDIS_WRITE_PORT: Joi.number().required().messages({ required: ' REDIS_WRITE_PORT' }),

        PG_READ_CONNECTION_STRING: Joi.string().required().messages({ required: ' PG_READ_CONNECTION_STRING' }),
        PG_WRITE_CONNECTION_STRING: Joi.string().required().messages({ required: ' PG_WRITE_CONNECTION_STRING' }),

        AWS_S3_REGIN: Joi.string().required().messages({ required: ' AWS_S3_REGIN' }),
        AWS_S3_PUBLIC_KEY: Joi.string().required().messages({ required: ' AWS_S3_PUBLIC_KEY' }),
        AWS_S3_PRIVATE_KEY: Joi.string().required().messages({ required: ' AWS_S3_PRIVATE_KEY' }),

        AWS_DYNAMO_REGIN: Joi.string().required().messages({ required: ' AWS_S3_REGIN' }),
        AWS_DYNAMO_PUBLIC_KEY: Joi.string().required().messages({ required: ' AWS_S3_PUBLIC_KEY' }),
        AWS_DYNAMO_PRIVATE_KEY: Joi.string().required().messages({ required: ' AWS_S3_PRIVATE_KEY' }),

        AWS_SQS_REGIN: Joi.string().required().messages({ required: ' AWS_SQS_REGIN' }),
        AWS_SQS_PUBLIC_KEY: Joi.string().required().messages({ required: ' AWS_SQS_PUBLIC_KEY' }),
        AWS_SQS_PRIVATE_KEY: Joi.string().required().messages({ required: ' AWS_SQS_PRIVATE_KEY' })
      })
    }),
    {
      global: true,
      ...HttpModule.register({ timeout: 3000 })
    },
    AppRequestModule,
    AppResponseModule,
    AppLoggerModule,
    AppAuthModule
  ]
})
export class CommonModule {}
