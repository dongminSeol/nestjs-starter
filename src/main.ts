import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 허용
  app.enableCors();

  // 전역 접두사 설정
  app.setGlobalPrefix('api', { exclude: ['/', 'health'] });

  // 버전 관리 설정
  app.enableVersioning({
    type: VersioningType.URI
  });

  // JSON 크기 제한
  app.use(json({ limit: '20mb' }));

  // 포트 설정
  await app.listen(process.env.PORT);
}

bootstrap().then(() => {
  // ENV 출력
  Logger.verbose(process.env.ENV, 'ENV');
  Logger.verbose(process.env.NAME, 'ENV-NAME');
  Logger.verbose(process.env.VERSION, 'ENV-VERSION');

  // 테스트 출력
  if (process.env.NODE_ENV === 'local') {
    Logger.debug(`http://localhost:${process.env.PORT}`, 'TEST DM API');
  }
});
