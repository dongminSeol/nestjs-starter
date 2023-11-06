# AppFile

프로젝트에서 사용하는 파일 업로드 Pipe 미들웨어 집합 입니다.

`@UploadFileSingle('file')` 또는 `@UploadFileMultiple('files')` 데코레이더 참조와 함께  `@UploadedFile(UserPipeMiddleware, CheckPipeMiddleware)` 유형에 맞는 구현 로직 ...pipes 를 연결 합니다.

작성 예시
```ts
export class MemberController {
  constructor(private readonly s3Service: AwsS3Service) {
  }

  @Post('/profile-image')
  @UploadFileSingle('file')
  async uploadProfileImage(@Req() { _id }: AppRequest, @UploadedFile(AppFileRequiredPipe, AppFileTypePipe) file: AppFileType) {

    const { pathWithFileName } = await this.s3Service.putItemInBucket('dev-first-repo', file.originalname, file.buffer,'developer');
    // ...
    
  }

}


```

### Folder Structure

1. `/constant` 파일 상수 모음
2. `/decorator ` FileInterceptor 데코레이더 모음
3. `/pipe` pipe 구현 부 모음
4. `type` Express Multer 타입 확장




