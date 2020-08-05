import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

// Jwt module
import { JwtModule } from '../jwt/jwt.module';

// User module
import { User } from './models/user/user.model';
import { UserService } from './services/user/user.service';
import { UsersResolver } from './resolvers/users/users.resolver';

@Module({
  imports: [JwtModule, TypegooseModule.forFeature([User])],
  providers: [UserService, UsersResolver],
  exports: [UserService],
})
export class UsersModule {}
