import { registerAs } from '@nestjs/config';

export default registerAs(
  'aws',
  (): Record<string, any> => ({
    s3: {
      region: process.env.AWS_S3_REGIN,
      publicKey: process.env.AWS_S3_PUBLIC_KEY,
      privateKey: process.env.AWS_S3_PRIVATE_KEY
    },
    dynamo: {
      region: process.env.AWS_DYNAMO_REGIN,
      publicKey: process.env.AWS_DYNAMO_PUBLIC_KEY,
      privateKey: process.env.AWS_DYNAMO_PRIVATE_KEY
    },
    sqs: {
      region: process.env.AWS_SQS_REGIN,
      publicKey: process.env.AWS_SQS_PUBLIC_KEY,
      privateKey: process.env.AWS_SQS_PRIVATE_KEY,
      url: process.env.AWS_SQS_URL
    }
  })
);
