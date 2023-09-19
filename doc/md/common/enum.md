# AppEnum

프로젝트 에서 사용되는 상수 코드 집합 디렉토리 입니다. Static 객체로 Enum을 다룰 수 있는 `ts-jenum` 을 사용 합니다.

Property 구성은 `아래를` 참조 하며 `ts-jenum` 키 규칙은 `code` 로 따릅니다.
```ts
{
  code: string;
  name: string;
  order: number;
  parentCode: string;
  description: string;
}
```

작성 예시
```ts
import { Enum, EnumType } from 'ts-jenum';

@Enum('code')
export class AuthTypeCode extends EnumType<AuthTypeCode>() {
  static readonly AuthType = new AuthTypeCode('AuthType', '권한 정보', 0, null, null);
  static readonly KaKao = new AuthTypeCode('KaKao', '카카오 회원 가입', 1, 'AuthType', null);
  static readonly Apple = new AuthTypeCode('Apple', '애플 회원 가입', 2, 'AuthType', null);
  static readonly Google = new AuthTypeCode('Google', 'Google 회원 가입', 3, 'AuthType', null);
  static readonly Mail = new AuthTypeCode('Mail', 'Mail 회원 가입', 4, 'AuthType', null);
  static readonly MobilePhone = new AuthTypeCode('MobilePhone', 'MobilePhone 회원 가입', 5, 'AuthType', null);
  constructor(
    readonly code: string,
    readonly name: string,
    readonly order: number,
    readonly parentCode: string,
    readonly description: string
  ) {
    super();
  }
}

```

### Folder Structure

1. `/domain` app 참조 상수 모음
2. `/..others ` 외부 참조 상수 모음




