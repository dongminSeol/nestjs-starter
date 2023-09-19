# AwsDynamoModule

### Module options

```ts
export interface AwsS3ModuleOptions {
  region: string;
  publicKey: string;
  privateKey: string;
}
```

### Module 전역 설정

```ts
import { AwsDynamoModule } from './aws.dynamo.module';

@Module({
  imports: [
    AwsDynamoModule.register({
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
import { AwsDynamoModule } from './aws.dynamo.module';

@Module({
  imports: [
    AwsDynamoModule.fooRoot({
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

> DynamoDB의 경우 Partition Key를 기준으로 테이블 항목을 분산 저장/처리를 수행하며 RDBMS SQL 조작 명령어가 있듯 DynamoDB 에서는 프로그래밍 언어와 유사한 형태로 쿼리 및 조작 구성하는 방법 `DSL` 을 제공 합니다.
> 아래 예시와 함께 [링크](https://www.youtube.com/watch?v=RfOt2bo0bSA) 참조 하시는걸 추천 드립니다.

```ts
@Injectable()
export class AppService {
  constructor(private readonly dynamoService: AwsDynamoService) {
  }

  async createUser() {
    /***
     *  @example RDBMS SQL 표현식을 DynamoDB DSL 표현식으로 한다면 아래 와 같습니다.
     *      insert into example-user-table (pk, sk, id, name, phone, age) values('user#1000001', 1692343298501, 1000001, '01087969394', 34);
     */
    const sortKey = new Date().getTime();
    const userId = 1000001;

    const entity = {
      pk: `user#${userId}`,
      sk: sortKey,
      id: userId,
      name: 'dongmin',
      age: 34
    };

    const params: PutParams = {
      TableName: 'example-user-table',
      Item: entity,
      ReturnValues: 'ALL_OLD'
    }

    return await thie.dynamoService.put(params);
  }

  async findUserById(id: number) {
    /***
     *  @example RDBMS SQL 표현식을 DynamoDB DSL 표현식으로 한다면 아래 와 같습니다.
     *      select *
     *      from example-user-table
     *      where pk = `user#${id}`;
     */

    const params: QueryParams = {
      TableName: 'example-user-table',                   // 테이블 명
      KeyConditionExpression: '#pk = :pk',               // 조회 조건문
      ExpressionAttributeNames: { '#pk': 'pk' },         // AttributeNames `pk` 항목을 `#pk` 표현식으로 랩핑
      ExpressionAttributeValues: { ':pk': `user#${id}` } // AttributeValues `user#${id}` 값을 `:pk` 표현식으로 랩핑
    };

    return await this.dynamoService.query(params);
  }

  async updateUserById(newName: string) {
    /***
     *  @example RDBMS SQL 표현식을 DynamoDB DSL 표현식으로 한다면 아래 와 같습니다.
     *      update set name = newName
     *      from example-user-table
     *      where pk = `user#${id}`;
     */

    const params: UpdateParams = {
      TableName: 'example-user-table',                 // 테이블 명
      Key: { 'pk': `user#${id}` },                     // 업데이트 항목 Partition Key
      UpdateExpression: 'SET #name =:name',            // 업데이트 조건 표현식
      ExpressionAttributeNames: { '#name': 'name' },   // 업데이트 항목 AttributeNames `name` 항목을 `#name` 표현식으로 랩핑
      ExpressionAttributeValues: { ':name': newName }, // 업데이트 값 AttributeNames `newName` 값을 `:name` 표현식으로 랩핑
      ReturnValues: 'ALL_NEW'
    };

    return await this.dynamoService.update(params);
  }
}
```

### Params 정의
```ts
import {
  DeleteItemCommand,
  DeleteItemCommandOutput,
  PutItemCommand,
  PutItemCommandOutput,
  QueryCommand,
  QueryCommandOutput,
  UpdateItemCommand,
  UpdateItemCommandOutput,
  TransactWriteItemsCommandInput,
} from '@aws-sdk/client-dynamodb';

export type CommandType = QueryCommand | UpdateItemCommand | PutItemCommand | DeleteItemCommand;
export type CommandOutputType = QueryCommandOutput & UpdateItemCommandOutput & PutItemCommandOutput & DeleteItemCommandOutput;

export type GetParams = {
  TableName: string | undefined;                    // 테이블 명
  Key: Record<string, any> | undefined;             // Partition key, Sort Key
}

export type QueryParams = {
  TableName: string;                                // 테이블 명
  KeyConditionExpression: string;                   // 조건식
  ExpressionAttributeNames: Record<string, string>; // AttributeNames 표현식
  ExpressionAttributeValues: Record<string, any>;   // AttributeValues 표현식
  IndexName?: string;                               // Secondary Index 가 포함이 될 경우 Index 명 참조 합니다.
  FilterExpression?: string;                        // 우선 순위 KeyCondition 반환 된 결과에서 필터링 조건 에 해당 하는 항목을 제외 후 반환 합니다.
  Limit?: number;                                   // 반환 목록의 행 갯수를 지정 합니다.
  ExclusiveStartKey?: Record<string, any>;          // OFF SET 검색 시작 인덱스
  ScanIndexForward?: boolean;                       // 조회 결과가 인덱스의 정렬 순서로 반환 됩니다. `false` 경우 역 순으로 반환 되며 기본 값 `true` 입니다.
  ConsistentRead?: boolean;                         // 읽기 작업의 강력한 일관성을 보장합니다. 예시로 재고 수량이나 엄격한 일관성이 필요한 데이터 조회 시 기본 값 `false` 입니다.
};
export type UpdateParams = {
  TableName: string;                                // 테이블 명
  Key: Record<string, any>;                         // 데이터 항목 Partition key 
  UpdateExpression: string;                         // 업데이트 작업 표현 식 (SET,REMOVE,ADD,DELETE)
  ConditionExpression?: string;                     // 업데이트 조건 표현 식 (작업에 조건이 충족 하는 항목만 포함 되도록 지정 합니다.)
  ExpressionAttributeNames: Record<string, string>; // AttributeNames 표현식
  ExpressionAttributeValues: Record<string, any>;   // AttributeValues 표현식
  ReturnValues: 'ALL_NEW';                          // 업데이트 작업 수행 후 반환되는 값을 지정 합니다. 기본 값 `ALL_NEW` (NONE, ALL_OLD, UPDATED_OLD, ALL_NEW, UPDATED_NEW) 
};
export type PutParams = {
  TableName: string;                                // 테이블 명
  Item: any;                                        // 추가하거나 갱신할 데이터 항목을 포함하는 JSON 형식의 객체.
  ConditionExpression?: string;                     // 입력 조건 표현식 (작업에 조건이 충족 하는 항목만 포함 되도록 지정 합니다.)
  ExpressionAttributeNames?: Record<string, string>;// AttributeNames 표현식
  ReturnValues: 'ALL_OLD';                          // 입력 작업 수행 후 반한되는 값을 지정 합니다. 기본 값 `ALL_OLD`
};
export type DeleteParams = {
  TableName: string;                                // 테이블 명
  Key: Record<string, any>;                         // 삭제 데이터 항목 Partition key 
  ConditionExpression?: string;                     // 삭제 조건 표현식 (작업에 조건이 충족 하는 항목만 포함 되도록 지정 합니다.)
  ExpressionAttributeNames?: Record<string, string>;// AttributeNames 표현식
  ExpressionAttributeValues?: Record<string, any>;  // AttributeValues 표현식
  ReturnValues: 'ALL_OLD';                          // 삭제 작업 수행 후 반한되는 값을 지정 합니다. 기본 값 `ALL_OLD`
};

export type TransactWriteParams = TransactWriteItemsCommandInput;



```

