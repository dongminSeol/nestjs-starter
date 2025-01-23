import { PipeTransform, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AppFileType } from '../types/app-file.type';
/**
 * 파일 요소 확인
 */
@Injectable()
export class AppFileRequiredPipe implements PipeTransform {
  public async transform(value: AppFileType | AppFileType[]): Promise<AppFileType | AppFileType[]> {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      throw new HttpException('Required files', HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
