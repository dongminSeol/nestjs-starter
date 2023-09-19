import { Global, Module } from '@nestjs/common';
import { AppAuthService } from './service/app-auth.service';
import { AppCacheModule } from '../app-cache/app-cache.module';

@Global()
@Module({
  imports: [AppCacheModule],
  providers: [AppAuthService],
  exports: [AppAuthService]
})
export class AppAuthModule {}
