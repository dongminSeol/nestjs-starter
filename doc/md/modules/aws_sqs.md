# AwsSqsModule

### Module options

```ts
export interface AwsSqsModuleOptions {
  region: string;
  publicKey: string;
  privateKey: string;
}
```

### Module 전역 설정

```ts
import { AwsSqsModule } from './aws.sqs.module';

@Module({
  imports: [
    AwsSqsModule.register({
      region: `{{region}}`,
      publicKey: `{{publicKey}}`,
      privateKey: `{{privateKey}}`
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
```

### Module 설정

```ts
import { AwsSqsModule } from './aws.sqs.module';

@Module({
  imports: [
    AwsSqsModule.fooRoot({
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

>  SQS의 FIFO(First-In-First-Out) 대기열 타입 (전송, 수신) 대한 설명 입니다.

```ts
@Injectable()
export class AppService {
  constructor(private readonly sqsService: AwsSqsService) {
  }
  /***
   * @params {string} url
   * @params {string} gorup FIFO 대기열에서 메시지 그룹을 식별하고 메시지의 처리 순서와 중복성을 관리하기 위해 사용됩니다.
   * @params {string} message
   * */
  async sqsSendMessage(url: string, group: string, message: string) {
    return await this.sqsService.sendMessage(url, group, message);
  }
  /***
   * @params {string} url
   * */
  async sqsReciveMessage(url: string) {
    return await this.sqsService.receiveMessage(url);
  }
}
```

