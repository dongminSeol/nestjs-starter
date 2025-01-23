import { JobLevel } from '../constants/app-job.enum.constant';

export interface LogParam {
  jobLevel: JobLevel;
  jobCode: string;
  message: string;
  description: string;
}

export interface Reader<T> {
  read(): Promise<T>;
}

export interface Processor<T, R> {
  process(item: T): R;
}

export interface Writer<T> {
  write(items: T[]): Promise<void>;
}
