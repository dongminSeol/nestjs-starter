import { PgService } from '../../../modules/pg/service/pg.service';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import * as ip from 'ip';
import { JobCd } from '../constant/app-job.enum';
import { QueryConfig } from 'pg';
import { PGConnectionPoolCode } from '../../app-enum/postgresql/pg-pool.code.enum';

export abstract class JobBase<TReader, TProcessor, TWriter> {
  protected readonly pg: PgService;
  protected readonly logger: Logger;
  protected readonly logName: string;
  protected readonly ipAddress: string;
  protected readonly startNow: number;

  protected constructor(logName: string, pg: PgService) {
    this.pg = pg;
    this.logger = new Logger(this.logName);
    this.logName = logName;
    this.ipAddress = ip.address();
    this.startNow = Date.now();
  }

  public async exec(isDebug = false): Promise<TWriter> {
    if (process.env.NODE_ENV === 'local' && !isDebug) return;

    try {
      await this.logSave(JobCd.START);

      const readerItems = await this.itemReader();
      const processorItems = await this.itemProcessor(readerItems);
      const writerItems = await this.itemWriter(processorItems);

      await this.logSave(JobCd.END);

      return writerItems;
    } catch (e) {
      await this.logSave(JobCd.CATCH, e);
    }
  }

  public abstract itemReader(): Promise<TReader>;

  public abstract itemProcessor(items: TReader): Promise<TProcessor>;

  public abstract itemWriter(items: TProcessor): Promise<TWriter>;

  protected async logSave(status: string, message?: string): Promise<void> {
    const elapsedTime = `${Date.now() - this.startNow}ms`;

    if (process.env.NODE_ENV === 'local') {
      const logMessage = `[${this.logName}][${status}] ${message ?? JobCd.MESSAGE}${elapsedTime ? ` (${elapsedTime})` : ''}`;

      if (status !== JobCd.CATCH) this.logger.verbose(logMessage);
      else this.logger.error(logMessage);
    }

    const config: QueryConfig = {
      text: 'call live.log_create_sp($1, $2, $3, $4, $5, $6, null, null);',
      values: [this.logName, status, message, this.startNow, elapsedTime, this.ipAddress]
    };
    const query = await this.pg.querySingle<{ row_count: number }>(config, PGConnectionPoolCode.Write.code);

    if (query.row_count < 1) throw new InternalServerErrorException('로그 생성에 실패하였습니다.');

  }
}
