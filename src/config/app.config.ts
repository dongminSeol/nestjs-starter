import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): Record<string, any> => ({
    version: process.env.VERSION,
    apiKey: process.env.APP_API_KEY,
    env: process.env.ENV,
    logger: {
      mongoURI: process.env.APP_LOGGER_MONGO_URI,
      maxPoolSize: process.env.APP_LOGGER_MAX_POOL_SIZE
    },
    request: {
      timeout: process.env.APP_REQUEST_TIME_OUT,
      retryCount: process.env.APP_REQUEST_RETRY_COUNT
    },
    http: {
      timeout: process.env.APP_HTTP_PROTOCOL_TIME_OUT
    },
    accessToken: {
      secretKey: process.env.APP_JWT_ACCESS_TOKEN_SECRET_KEY,
      expired: process.env.APP_JWT_ACCESS_TOKEN_EXPIRED
    },
    refreshToken: {
      secretKey: process.env.APP_JWT_REFRESH_TOKEN_SECRET_KEY,
      expired: process.env.APP_JWT_REFRESH_TOKEN_EXPIRED
    }
  })
);
