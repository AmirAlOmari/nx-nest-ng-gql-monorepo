import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { CustomJwtModule } from '../jwt/jwt.module';
import { UsersModule } from '../users/users.module';

import { GqlAuthGuard } from './guards/gql-auth/gql-auth.guard';

@Module({
  imports: [ConfigModule, CustomJwtModule, UsersModule],
  providers: [GqlAuthGuard],
  exports: [GqlAuthGuard]
})
export class SharedModule {}
