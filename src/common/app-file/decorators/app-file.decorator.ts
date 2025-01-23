import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

/**
 * 업로드 인터셉터 - 단건
 */
export function UploadFileSingle(field: string): MethodDecorator {
  return applyDecorators(UseInterceptors(FileInterceptor(field)));
}

/**
 * 업로드 인터셉터 - 멀티
 */
export function UploadFileMultiple(field: string): MethodDecorator {
  return applyDecorators(UseInterceptors(FilesInterceptor(field)));
}
