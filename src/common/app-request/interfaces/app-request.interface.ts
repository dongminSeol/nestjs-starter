import { Request } from 'express';
export interface AppRequest extends Request {
  _id: number;
  _roleCode: string;
}
