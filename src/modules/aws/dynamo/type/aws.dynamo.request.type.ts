import {
  DeleteItemCommand,
  DeleteItemCommandOutput,
  PutItemCommand,
  PutItemCommandOutput,
  QueryCommand,
  QueryCommandOutput,
  UpdateItemCommand,
  UpdateItemCommandOutput,
  TransactWriteItemsCommandInput
} from '@aws-sdk/client-dynamodb';

export type CommandType = QueryCommand | UpdateItemCommand | PutItemCommand | DeleteItemCommand;
export type CommandOutputType = QueryCommandOutput & UpdateItemCommandOutput & PutItemCommandOutput & DeleteItemCommandOutput;

export type GetParams = {
  TableName: string | undefined;
  Key: Record<string, any> | undefined;
}

export type QueryParams = {
  TableName: string;
  KeyConditionExpression: string;
  ExpressionAttributeNames?: Record<string, string>;
  ExpressionAttributeValues?: Record<string, any>;
  IndexName?: string;
  FilterExpression?: string;
  Limit?: number;
  ExclusiveStartKey?: Record<string, any>;
  ScanIndexForward?: boolean;
  ConsistentRead?: boolean;
};
export type UpdateParams = {
  TableName: string;
  Key: Record<string, any>;
  UpdateExpression: string;
  ConditionExpression?: string;
  ExpressionAttributeNames?: Record<string, string>;
  ExpressionAttributeValues?: Record<string, any>;
  ReturnValues: 'ALL_NEW';
};
export type PutParams = {
  TableName: string;
  Item: Record<string, any>;
  ConditionExpression?: string;
  ExpressionAttributeNames?: Record<string, string>;
  ReturnValues: 'ALL_OLD';
};
export type DeleteParams = {
  TableName: string;
  Key: Record<string, any>;
  ConditionExpression?: string;
  ExpressionAttributeNames?: Record<string, string>;
  ExpressionAttributeValues?: Record<string, any>;
  ReturnValues: 'ALL_OLD';
};

export type TransactWriteParams = TransactWriteItemsCommandInput;
