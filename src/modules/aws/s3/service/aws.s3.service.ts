import { Inject, Injectable } from '@nestjs/common';
import { _Object, HeadBucketCommand, HeadBucketCommandOutput, ListBucketsCommand, ListObjectsV2Command, ListObjectsV2Output, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { AWS_S3_MODULE_OPTIONS } from '../constant/aws.s3.constant';
import { AwsDynamoModuleOptions } from '../../dynamo/interface/aws.dynamo.option.interface';

@Injectable()
export class AwsS3Service {
  private readonly s3Client: S3Client;
  constructor(@Inject(AWS_S3_MODULE_OPTIONS) option: AwsDynamoModuleOptions) {
    this.s3Client = new S3Client({
      credentials: {
        accessKeyId: option.publicKey,
        secretAccessKey: option.privateKey
      },
      region: option.region
    });
  }

  /**
   * S3 연결 확인
   */
  public async checkConnection(bucket: string): Promise<HeadBucketCommandOutput> {
    const command: HeadBucketCommand = new HeadBucketCommand({
      Bucket: bucket
    });
    try {
      return await this.s3Client.send(command);
    } catch (err) {
      throw Error(err?.message);
    }
  }

  /**
   * S3 버킷 정보
   */
  public async listBucket() {
    const command: ListBucketsCommand = new ListBucketsCommand({});
    try {
      return await this.s3Client.send(command);
    } catch (err) {
      throw Error(err);
    }
  }
  /**
   * S3 버킷 파일 정보 리스트
   * @param bucket
   * @param prefix 디렉토리 명 없을 경우 전체 정보 반환
   */
  public async listItemInBucket(bucket: string ,prefix?: string) {
    const command: ListObjectsV2Command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix
    });
    try {
      const listItems: ListObjectsV2Output = await this.s3Client.send(command);

      return listItems.Contents.map((val: _Object) => {
        const lastIndex: number = val.Key.lastIndexOf('/');
        const path: string = val.Key.substring(0, lastIndex);
        const filename: string = val.Key.substring(lastIndex, val.Key.length);
        const mime: string = filename.substring(filename.lastIndexOf('.') + 1, filename.length).toLocaleUpperCase();

        return {
          path,
          pathWithFilename: val.Key,
          filename: filename,
          mime: mime
        };
      });
    } catch (err) {
      throw Error(err);
    }
  }
  /**
   * S3 버킷 파일 업로드
   * @param bucket
   * @param fileName
   * @param content
   * @param path
   */
  public async putItemInBucket(bucket: string, fileName: string, content: string | Uint8Array | Buffer, path?: string | null) {
    const randomFileName = this.generatorForNumber(7);
    const mime: string = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
    const key = `${path}/${randomFileName}.${mime}`;
    const command: PutObjectCommand = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: mime,
      Body: content,
      ACL: 'public-read'
    });

    try {
      await this.s3Client.send(command);
    } catch (err) {
      throw Error(err);
    }
    return {
      path,
      pathWithFileName: `/${key}`,
      fileName: `${randomFileName}.${mime}`,
      mime: mime
    };
  }
  private generatorForNumber(len = 6) {
    const randomNumbers = [];
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < len; i++) {
      randomNumbers.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return randomNumbers.join('');
  }
}
