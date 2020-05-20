import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { JwtModule } from '../jwt/jwt.module';

import { UsersResolver } from './resolvers/users/users.resolver';
import { UserService } from './services/user/user.service';
import { User } from './models/user/user.model';

@Module({
  imports: [JwtModule, TypegooseModule.forFeature([User])],
  providers: [UserService, UsersResolver],
  exports: [UserService]
})
export class UsersModule {}
