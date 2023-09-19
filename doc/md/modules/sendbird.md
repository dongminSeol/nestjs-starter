# SendbirdModule

### Module options

```ts
export interface SendbirdOptions {
  apiEndPoint: string;
  apiToken: string;
}
export interface SendbirdAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<SendbirdOptions> | SendbirdOptions;
  inject?: any[];
}

```


### Module 설정
```ts
@Module({
  imports: [
    SendbirdModule.forRoot({
      apiEndPoint: 'https://api-123123-557E-44D6-9E4B-958B171B7982.sendbird.com',
      apiToken: 'e122315ff014762199d6af3bfa6b86d23021f96c0f'
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
```

### Reference

```ts

@Injectable()
export class AppService {
  constructor(private readonly sendbirdService: SendbirdService) {
  }

  async sendMessage(id: number) {
    const response = await sendbirdService.send({
      senderId: 10001395,                         // 발신자 식별자 정보
      senderName: '이강민',                        // 발신자 사용자 닉네임
      recipientId: 10000925,                      // 수신자 식별자 정보
      recipientName: '서장훈',                     // 수신자 닉네임 정보
      message: '안녕 반가워요.',
      data: {                                     // 선택 사항
        thumbnail_url: 'https://...thumbnail.png', // 전송 이미지
      }
    });
  }
}
```
