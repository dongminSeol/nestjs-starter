import { registerAs } from '@nestjs/config';

export default registerAs(
  'pg',
  (): Record<string, any> => ({
    read: {
      connectionString: process.env.PG_READ_CONNECTION_STRING,
      connectionTimeoutMillis: process.env.PG_CONNECTION_TIMEOUT_MILLIS,
      max: process.env.PG_MAX
    },
    write: {
      connectionString: process.env.PG_WRITE_CONNECTION_STRING,
      connectionTimeoutMillis: process.env.PG_CONNECTION_TIMEOUT_MILLIS,
      max: process.env.PG_MAX
    }
  })
);
