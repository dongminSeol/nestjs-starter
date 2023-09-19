import { PipeTransform, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AppFileImageMIME } from '../constant/app-file.enum.constant';
import { AppFileType } from '../type/app-file.type';

/**
 * 이미지 확장자 타입을 확인 합니다.
 */
@Injectable()
export class AppFileTypePipe implements PipeTransform {
  public async transform(value: AppFileType | AppFileType[]): Promise<AppFileType | AppFileType[]> {
    if (!value) {
      return;
    }

    if (Array.isArray(value)) {
      for (const val of value) {
        await this.validate(val.mimetype);
      }
      return value;
    }

    const file = value as AppFileType;
    await this.validate(file.mimetype);
    return value;
  }
  public async validate(mimetype: string): Promise<void> {
    if (!Object.values(AppFileImageMIME).find((val) => val === mimetype.toLowerCase())) {
      throw new HttpException(`지원되지 않는 미디어 유형 ${mimetype.toLowerCase()}`, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }
    return;
  }
}
