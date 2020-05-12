import { Module } from '@nestjs/common';

import { UsersResolver } from './resolvers/users/users.resolver';

@Module({
  imports: [UsersResolver]
})
export class UsersModule {}
