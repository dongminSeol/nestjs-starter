# PgModule

### Module options

```ts
export interface PGOptions extends PoolConfig {
  poolName: string;
}

export interface PGModuleOptions {
  config: PGOptions[];
}

export interface PGModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (args: any) => Promise<PGModuleOptions> ;
  inject?: any[];
}
```


### Module 설정
```ts
@Module({
  imports: [
    PGModule.register({
      config: [
        {
          poolName: `write`,
          connectionString: 'postgres://test:test_1024@localhost:5432/test',
          connectionTimeoutMillis: 10000,
          max: 20
        },
        {
          poolName: `read`,
          connectionString: 'postgres://test:test_1024@localhost:5432/test',
          connectionTimeoutMillis: 10000,
          max: 20
        }
      ]
    }),
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
  constructor(private readonly pgService: PgService) {
  }

  async findUserById(id: number) {
    const config = {
      text: `select * from member where id = $1;`,
      values: [id]
    };
    return await this.pgService.query<{id: number; name: string; age: number; email: string}>(config, `read`);
  }
  
  async createUser(name: string, age: number, email: string) {
    const config = {
      text: `insert into member(name, age, email) values ($1, $2, $3);`,
      values: [name, age, email]
    };
    return await this.pgService.query<any>(config, `write`);  
  }

}
```
