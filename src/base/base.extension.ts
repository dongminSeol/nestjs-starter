import { BaseDto } from './base.dto';

declare global {
  interface Array<T> {
    toDtos<Dto extends BaseDto>(this: T[], options?: unknown): Dto[];
  }
}
