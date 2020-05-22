import { Module } from '@nestjs/common';

// Jwt module
import { JwtModule } from '../jwt/jwt.module';

// Users module
import { UsersModule } from '../users/users.module';

// Auth module
import { AuthService } from './services/auth/auth.service';
import { AuthResolver } from './resolvers/auth/auth.resolver';
import { GqlAuthGuard } from './guards/gql-auth/gql-auth.guard';

@Module({
  imports: [JwtModule, UsersModule],
  providers: [AuthService, AuthResolver, GqlAuthGuard],
  exports: [AuthService, GqlAuthGuard]
})
export class AuthModule {}
