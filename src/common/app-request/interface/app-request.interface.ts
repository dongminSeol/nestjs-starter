import { Request } from 'express';
export interface AppRequest extends Request {
  _id: number;
  _payload: Record<string, any>;
  _language_tag: string;
  _isAuthorized: boolean;
}
