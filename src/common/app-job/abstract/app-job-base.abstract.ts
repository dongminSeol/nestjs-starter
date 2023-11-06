import { JobCode, JobLevel } from '../constant/app-job.enum.constant';
import { AppJobLogParams } from '../interface/app-job.interface';
import { AppJobLogService } from '../service/app-job.service';
import * as ip from 'ip';

export abstract class JobBase<TReader, TProcessor, TWriter> {
  protected readonly jobLog: AppJobLogService;
  protected readonly logName: string;
  protected readonly ipAddress: string;
  protected readonly startNow: number;

  protected constructor(jobLogService :AppJobLogService, logName: string) {
    this.jobLog = jobLogService;
    this.logName = logName;
    this.ipAddress = ip.address();
    this.startNow = Date.now();
  }

  public async exec(isDebug = false): Promise<TWriter> {
    if (isDebug) return;

    try {
      await this.logSave(JobCode.START);

      const readerItems = await this.itemReader();
      const processorItems = await this.itemProcessor(readerItems);
      const writerItems = await this.itemWriter(processorItems);

      await this.logSave(JobCode.END);

      return writerItems;
    } catch (e) {
      await this.logSave(JobCode.CATCH, e);
    }
  }

  public abstract itemReader(): Promise<TReader>;

  public abstract itemProcessor(items: TReader): Promise<TProcessor>;

  public abstract itemWriter(items: TProcessor): Promise<TWriter>;

  protected async logSave(code: JobCode, message?: string): Promise<void> {

    const elapsedTime = `${Date.now() - this.startNow}ms`;
    const level: JobLevel = JobCode.CATCH ? JobLevel.Verbose : JobLevel.Error;
    const description = `[${this.logName}][${code}] ${message ?? JobCode.MESSAGE}${elapsedTime ? ` (${elapsedTime})` : ''}`;

    const params: AppJobLogParams = {
      jobLevel: level,
      jobCode: code,
      jobName: this.logName,
      message: message,
      ipAddress: this.ipAddress,
      description: description
    };

    await this.jobLog.log(params);

  }
}
