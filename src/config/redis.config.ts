import { registerAs } from '@nestjs/config';

export default registerAs(
  'redis',
  (): Record<string, any> => ({
    read: {
      host: process.env.REDIS_READ_HOST,
      port: process.env.REDIS_READ_PORT,
      db: process.env.REDIS_DB
    },
    write: {
      host: process.env.REDIS_WRITE_HOST,
      port: process.env.REDIS_WRITE_PORT,
      db: process.env.REDIS_DB
    }
  })
);
