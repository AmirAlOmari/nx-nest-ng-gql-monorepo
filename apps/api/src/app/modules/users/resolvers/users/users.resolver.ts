import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { User } from '../../models/user/user.model';
import { PutUserInput } from '../../inputs/put-user/put-user.input';

@Resolver(of => User)
export class UsersResolver {
  construct() {}

  @Query(returns => [User])
  async getAll() {}

  @Mutation(returns => User)
  async putUser(@Args('input') input: PutUserInput) {}
}
