import { AppLogAction } from '../constant/app-logger.enum.constant';

export interface AppLoggerParams {
  action: AppLogAction;
  description: string;

  path?: string;
  method?: string;
  params?: Record<string, any>;
  statusCode?: number;
}
