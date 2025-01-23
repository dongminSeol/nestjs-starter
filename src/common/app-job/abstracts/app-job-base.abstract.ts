import { JobCode, JobLevel } from '../constants/app-job.enum.constant';
import { LogParam } from '../interfaces/app-job.interface';
import { Logger } from '@nestjs/common';

export abstract class AppJobBase<TReader, TProcessor, TWriter> {
  private readonly _startNow: number = Date.now();

  get startNow(): number {
    return this._startNow;
  }

  async exec(): Promise<TWriter | void> {
    try {
      await this.log(JobCode.START);
      const readerItems = await this.reader();
      const processorItems = await this.processor(readerItems);
      const writerItems = await this.writer(processorItems);
      await this.log(JobCode.END);

      return writerItems;
    } catch (err) {
      await this.log(JobCode.CATCH, err instanceof Error ? err.message : String(err));
    }
  }

  abstract reader(): Promise<TReader>;
  abstract processor(items: TReader): Promise<TProcessor>;
  abstract writer(items: TProcessor): Promise<TWriter>;

  protected async log(code: JobCode, message?: string): Promise<void> {
    const elapsedTime = `${Date.now() - this._startNow}ms`;
    const isCatch = code === JobCode.CATCH;
    const level: JobLevel = isCatch ? JobLevel.Error : JobLevel.Verbose;
    const description = `[${code}] ${message ?? JobCode.MESSAGE}${elapsedTime ? ` (${elapsedTime})` : ''}`;

    const params: LogParam = {
      jobLevel: level,
      jobCode: code,
      message: message,
      description: description
    };

    Logger.verbose(params);
  }
}
