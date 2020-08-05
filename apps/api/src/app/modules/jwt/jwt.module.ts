import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';

import { jwtOptionsProvider } from './providers/jwt-options/jwt-options.provider';
import { JwtService } from './services/jwt/jwt.service';

@Module({
  imports: [ConfigModule],
  providers: [JwtService, jwtOptionsProvider],
  exports: [JwtService],
})
export class JwtModule {}
