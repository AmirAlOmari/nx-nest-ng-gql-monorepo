import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { UsersResolver } from './resolvers/users/users.resolver';
import { UserService } from './services/user/user.service';
import { User } from './models/user/user.model';

@Module({
  imports: [TypegooseModule.forFeature([User])],
  providers: [UserService, UsersResolver]
})
export class UsersModule {}
