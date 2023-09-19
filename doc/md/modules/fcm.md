# FcmModule

### Module options

```ts
export interface FcmModuleOptions {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}
export interface FcmModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<FcmModuleOptions> | FcmModuleOptions;
  inject?: any[];
}

```


### Module 설정
> 하위 계정 정보 획득 방법은 [firebase.google.com](https://firebase.google.com/docs/cloud-messaging/auth-server?hl=ko) 링크를 참조 해주세요.
```ts
@Module({
  imports: [
    FcmModule.fooRoot({
      privateKey: `{{privateKey}}`,
      clientEmail: `{{clientEmail}}`,
      projectId: `{{projectId}}`
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
  constructor(private readonly fcmService: FcmService) {
  }

  /***
   * 단건 메세지 전송 요청 시
   * */
  async fcmSend() {
    const message: SendMessageType = {
      token: `ABFODKL-3DG7YAS1`,
      notification: {
        title: `메세지-제목`,
        body: '메세지-본문'
      },
    };

    return await this.fcmService.send(message);
  }

  /***
   * 다수의 사용자에게 개별 메세지 전송 요청 시
   * */
  async fcmSendEach() {
    const messages: SendMessageType [] = [
      {
        token: `ABFODKL-3DG7YAS1`,
        notification: { 
          title: `메세지-제목-01`, 
          body: '메세지-본문-01'
        },
        data: {
          link: 'https://google.com'
        }
      },
      {
        token: `CBSWVSS-3DG7YAS1`,
        notification: {
          title: `메세지-제목-02`,
          body: '메세지-본문-02'
        },
        data: {
          referer: 'https://google.com/admin'
        }
      },
      {
        token: `FSCCAWE-3DG7YAS1`,
        notification: {
          title: `메세지-제목-03`,
          body: '메세지-본문-03'
        }
      },
    ];
    return await this.fcmService.sendEach(messages);
  }

  /***
   * 하나의 메세지를 다수의 사용자에게 전송 요청 시
   * */
  async fcmSendEachForMulticast() {
    const multicastMessage: MulticastMessage = {
      tokens: [`ABFODKL-3DG7YAS1`,`CBSWVSS-3DG7YAS1`,`FSCCAWE-3DG7YAS1`],
      notification: {
        title: `메세지-제목`,
        body: `메세지-본문`
      },
      data: {
        link: 'https://google.com'
      }
    } 
    return await this.fcmService.sendEachForMulticast(multicastMessage);
  }

}
```

### Message Payload
```ts
export type MessagePayloadType = {
  token: string;                                    // FireBase Device Token
  ttl?: number;                                     // 메세지 노출 시간 지정
  notification: firebase.messaging.Notification;    // APP 메세지 표기 정보 { title: string; body: string; imageUrl: string }
  data?: Record<string, any>;                       // 사용자 정의 `key`: `value` 값
};
export type MultiMessagePayloadType = {
  tokens: string[];                                 // FireBase Device Token - 복수형
  ttl: number;                                      // 메세지 노출 시간 지정
  notification: firebase.messaging.Notification;    // APP 메세지 표기 정보 { title: string; body: string; imageUrl: string }
  data?: Record<string, any>;                       // 사용자 정의 `key`: `value` 값
};

/***
 * @example SendMessageType
 *  {
 *     token: string;
 *     data?: { [key: string]: string; }
 *     notification?: Notification | { title: string; body: string; imageUrl: string }
 *     android?: AndroidConfig
 *     webpush?: WebpushConfig
 *     apns?: ApnsConfig
 *     fcmOptions?: FcmOptions
 *  }
 */
export type SendMessageType = TokenMessage;

/***
 * @example MulticastMessage
 *  {
 *     token: string[];
 *     data?: { [key: string]: string; }
 *     notification?: Notification | { title: string; body: string; imageUrl: string }
 *     android?: AndroidConfig
 *     webpush?: WebpushConfig
 *     apns?: ApnsConfig
 *     fcmOptions?: FcmOptions
 *  }
 */
export type SendMulticastType = MulticastMessage;

export type BatchResultType = {
  responses: Array<{ device_token: string; success: boolean; messageId?: string; error?: FirebaseError }>;
  successCount: number;
  failureCount: number;
};

```
