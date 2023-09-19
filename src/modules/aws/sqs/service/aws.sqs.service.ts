import { DeleteMessageCommand, DeleteMessageCommandInput, ReceiveMessageCommand, ReceiveMessageCommandInput, SendMessageCommand, SendMessageCommandInput, SQSClient } from '@aws-sdk/client-sqs';
import { Inject, Injectable } from '@nestjs/common';
import { AWS_SQS_MODULE_OPTIONS } from '../constant/aws.sqs.constant';
import { AwsSqsModuleOptions } from '../interface/aws.sqs.module.option.interface';
import { v4 } from 'uuid';

@Injectable()
export class AwsSqsService {
  private readonly sqsClient: SQSClient;

  constructor(@Inject(AWS_SQS_MODULE_OPTIONS) option: AwsSqsModuleOptions) {
    this.sqsClient = new SQSClient({
      credentials: {
        accessKeyId: option.publicKey,
        secretAccessKey: option.privateKey
      },
      region: option.region
    });
  }

  public async sendMessage(queueUrl: string, group: string, message: string) {
    const input: SendMessageCommandInput = {
      QueueUrl: queueUrl,
      MessageBody: message,
      MessageGroupId: group,
      MessageDeduplicationId: v4()
    };

    return await this.sqsClient.send(new SendMessageCommand(input));
  }

  public async receiveMessage(queueUrl: string) {
    const input: ReceiveMessageCommandInput = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 10
    };

    return await this.sqsClient.send(new ReceiveMessageCommand(input));
  }

  public async deleteMessage(queueUrl: string, receiptHandle: string) {
    const input: DeleteMessageCommandInput = {
      QueueUrl: queueUrl,
      ReceiptHandle: receiptHandle
    };

    return {
      receiptHandle,
      deleteMessage: await this.sqsClient.send(new DeleteMessageCommand(input))
    };
  }

  public async receiveDeleteMessage(queueUrl: string) {
    const receiveData = await this.receiveMessage(queueUrl);

    const promiseDelete = [];
    if (receiveData.Messages) {
      for (const item of receiveData.Messages) {
        promiseDelete.push(this.deleteMessage(queueUrl, item.ReceiptHandle));
      }
    }
    const deleteData = await Promise.all(promiseDelete);

    return {
      receiveData,
      deleteData
    };
  }
}
