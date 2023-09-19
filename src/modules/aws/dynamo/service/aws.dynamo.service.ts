import { Inject } from '@nestjs/common';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import {
  DynamoDBClient,
  GetItemCommand,
  QueryCommand,
  UpdateItemCommand,
  PutItemCommand,
  DeleteItemCommand,
  TransactWriteItemsCommand
} from '@aws-sdk/client-dynamodb';
import {
  CommandType,
  CommandOutputType,
  GetParams,
  UpdateParams,
  QueryParams,
  PutParams,
  DeleteParams,
  TransactWriteParams
} from '../type/aws.dynamo.request.type';
import { AWS_DYNAMO_MODULE_OPTIONS } from '../constant/aws.dynamo.constant';
import { AwsDynamoModuleOptions } from '../interface/aws.dynamo.option.interface';


export class AwsDynamoService {
  private readonly dynamoDB: DynamoDBClient;

  constructor(@Inject(AWS_DYNAMO_MODULE_OPTIONS) option: AwsDynamoModuleOptions) {
    this.dynamoDB = new DynamoDBClient({
      credentials: {
        accessKeyId: option.publicKey,
        secretAccessKey: option.privateKey
      },
      region: option.region
    });
  }

  private marshallValues<T extends Record<string, any>>(values: T): T {

    const keys: (keyof T)[] = ['Item', 'Key', 'ExpressionAttributeValues'];

    for (const key of keys) {
      if (values[key] !== undefined) {
        values[key] = marshall(values[key]) as T[keyof T];
      }
    }

    return values;
  }

  private unmarshallValues<T>(values: Record<string, any>): T {
    return unmarshall(values) as T;
  }

  private async sendCommand<T>(command: CommandType): Promise<T[]> {
    try {
      const response: CommandOutputType = await this.dynamoDB.send(command) as CommandOutputType;

      if (response?.Items) {
        return response.Items.map((item => this.unmarshallValues<T>(item)));
      }

      if (response?.Attributes) {
        return [this.unmarshallValues<T>(response.Attributes)]
      }

      return [];

    } catch (err) {
      throw new Error(err);
    }

  }

  public async get<T>(params: GetParams) {
    const paramsWithMarshaledValues = this.marshallValues(params);
    const { Item } = await this.dynamoDB.send(new GetItemCommand(paramsWithMarshaledValues));

    return Item ? this.unmarshallValues<T>(Item) : null;
  }

  public async query<T>(params: QueryParams) {

    const paramsWithMarshaledValues = this.marshallValues(params);
    return await this.sendCommand<T>(new QueryCommand(paramsWithMarshaledValues));
  }

  public async update<T>(params: UpdateParams) {

    const paramsWithMarshaledValues = this.marshallValues(params);
    return await this.sendCommand<T>(new UpdateItemCommand(paramsWithMarshaledValues));
  }

  public async put<T>(params: PutParams) {
    const paramsWithMarshaledValues = this.marshallValues(params);
    return await this.sendCommand<T>(new PutItemCommand(paramsWithMarshaledValues));
  }

  public async delete<T>(params: DeleteParams) {

    const paramsWithMarshaledValues = this.marshallValues(params);
    return await this.sendCommand<T>(new DeleteItemCommand(paramsWithMarshaledValues));
  }

  public async transactWrite(params: TransactWriteParams) {
    try {
      const transactWriteItemsCommand = new TransactWriteItemsCommand(params);
      return await this.dynamoDB.send(transactWriteItemsCommand);
    } catch (err) {
      throw new Error(err);
    }
  }

  public async queryAllData<T>(params: QueryParams) {

    const result: Array<T> = [];
    do {
      const paramsWithMarshaledValues = this.marshallValues(params);
      const output = await this.dynamoDB.send(new QueryCommand(paramsWithMarshaledValues));
      const values = output.Items.map((item => this.unmarshallValues<T>(item)));

      result.push(...values);

      params.ExclusiveStartKey = output.LastEvaluatedKey;

    } while (params.ExclusiveStartKey);

    return result;
  }

}
