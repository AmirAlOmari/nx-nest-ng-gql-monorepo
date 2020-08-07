import { Module, Logger } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';

import { LoggerService } from './services/logger/logger.service';

@Module({
  imports: [ConfigModule],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class CommonModule {}
