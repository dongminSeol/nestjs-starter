import { JobLevel } from '../constant/app-job.enum.constant';

export interface AppJobLogParams {
  jobLevel: JobLevel;
  jobCode: string;
  jobName: string;
  message: string;
  ipAddress: string;
  description: string;
}
