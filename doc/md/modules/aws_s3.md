# AwsS3Module

### Options

```ts
export interface AwsS3ModuleOptions {
  region: string;
  publicKey: string;
  privateKey: string;
}
```

### Module 전역 설정

```ts
@Module({
  imports: [
    AwsS3Module.register({
      region: `{{region}}`,
      publicKey: `{{publicKey}}`,
      privateKey: `{{privateKey}}`
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Module 설정

```ts
@Module({
  imports: [
    AwsS3Module.fooRoot({
      region: `{{region}}`,
      publicKey: `{{publicKey}}`,
      privateKey: `{{privateKey}}`
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Reference

```ts
@Injectable()
export class AppService {
  constructor(private readonly s3Service: AwsS3Service) {
  }
  
  async s3FileUpload(bucketName: string, uploadPath: string ,content: Buffer| Uint8Array| string ): Promise<void> {
    
    const result = await this.s3Service.putItemInBucket(bucketName, content, uploadPath);
    Logger.verbose(result);
  }
}
```
