import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';

import { jwtOptionsProvider } from './providers/jwt-options/jwt-options.provider';
import { CustomJwtService } from './services/jwt/jwt.service';

@Module({
  imports: [ConfigModule],
  providers: [CustomJwtService, jwtOptionsProvider],
  exports: [CustomJwtService]
})
export class CustomJwtModule {}
