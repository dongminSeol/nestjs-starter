# AppJob

1. Task 구성 시 `JobBase` Abstract Class 참조 하여 작성 합니다.
2. 모든 기록은 `logSave` 함수를 통해 DB 에 기록 합니다.
3. 모든 실행 단위는 `exec` 함수를 통해 Task 단위를 실행 합니다.

```ts
// task.service.ts

@Injectable()
export class TaskService {
  constructor(private readonly pg: PgService) {}


  @Cron('*/10 * * * * *', { name: 'TestJob', timeZone: 'Asia/Seoul' })
  async test(): Promise<void> {
    const job = new TestJob(this.pg, this.redisRead, this.redisWrite);
    await job.exec();
  }
}



// test-job.ts

export class TestJob extends JobBase<any, any, void> {

  constructor(pg: PgService) {
    super(TestJob.name, pg);
  }

  async itemReader(): Promise<any[]> {
    // .. do something about
    return [];
  }

  async itemProcessor(items: any[]): Promise<TestProcessorRes[]> {
    // .. do something about
    return [];
  }

  async itemWriter(items: any[]): Promise<void> {
    // .. do something about
    await this.logSave('itemWriter');
  }
}
```


추상 메서드 멤버
```ts
public abstract itemReader(): Promise<TReader>;

public abstract itemProcessor(items: TReader): Promise<TProcessor>;

public abstract itemWriter(items: TProcessor): Promise<TWriter>;
```

구현된 메서드 멤버
```ts
protected async logSave(status: string, message?: string): Promise<void>;

public async exec(isDebug = false): Promise<TWriter>;
```


### Folder Structure

1. `/abstract`
2. `/constant `
