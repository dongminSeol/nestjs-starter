# MongooseModule

### Module 설정
```ts
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoose.db.uri'),
        maxPoolSize: configService.get<number>('mongoose.db.maxPoolSize')
      })
    }),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
```

### Schema 설정
```ts
@Schema({
  collection: 'member-data',
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class MemberData extends BaseFields {
  @Prop({ required: true, type: Types.ObjectId, ref: 'MemberAuth' })
  authId: Types.ObjectId;

  @Prop({ required: true, type: String})
  name: string

  @Prop({ required: false, type: String})
  email?: string
}

export const MemberDataSchema = SchemaFactory.createForClass(MemberData);
```

### Reference

```ts
@Injectable()
export class MemberService {
  constructor(
    @InjectConnection(MongooseConnectionNameCode.Dev.code) private readonly connection: Connection,
    @InjectModel(MemberData.name, MongooseConnectionNameCode.Dev.code) private readonly memberDataModel: Model<MemberDataDocument>
  ) {}

  public async create(id: string, bodyReq: MemberV1CreateReq) {
    const memberData = {
      authId: new Types.ObjectId(id),
      name: bodyReq.name,
      email: bodyReq.email
    };

    return await new this.memberDataModel(memberData).save();
  }

  public async updateProfile(id: string, bodyReq: MemberV1ProfileUpdateReq) {
    return await this.memberDataModel.findOneAndUpdate({ authId: new Types.ObjectId(id) }, bodyReq, { new: true }).exec();
  }

  public async find(id: string, bodyReq: MemberV1FindReq) {
    return await this.memberDataModel.find(bodyReq, { authId: 1, name: 1, email: 1 }).populate({ path: 'authId' }).exec();
  }

  public async delete(id: string) {
    return await this.memberDataModel.findOneAndDelete({ authId: new Types.ObjectId(id) }).exec();
  }
}

```
