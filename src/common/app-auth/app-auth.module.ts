import { Global, Module } from '@nestjs/common';
import { AppAuthConfigService } from './services/app-auth.config.service';

@Global()
@Module({
  imports: [],
  providers: [AppAuthConfigService],
  exports: [AppAuthConfigService]
})
export class AppAuthModule {}
