import { Module } from '@nestjs/common';
import { configServiceProvider } from './providers/config-service/config-service.provider';
import { ConfigService } from './services/config/config.service';

@Module({
  providers: [configServiceProvider],
  exports: [ConfigService],
})
export class ConfigModule {}
