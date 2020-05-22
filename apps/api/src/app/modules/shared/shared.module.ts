import { Module } from '@nestjs/common';

// Config module
import { ConfigModule } from '../config/config.module';

// Jwt module
import { JwtModule } from '../jwt/jwt.module';

// Users module
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ConfigModule, JwtModule, UsersModule]
})
export class SharedModule {}
