import { registerAs } from '@nestjs/config';

export default registerAs(
  'mongoose',
  (): Record<string, any> => ({
    db: {
      uri: process.env.MONGOOSE_DB_URI,
      maxPoolSize: process.env.MONGOOSE_DB_MAX_POOL_SIZE
    },
  })
);
