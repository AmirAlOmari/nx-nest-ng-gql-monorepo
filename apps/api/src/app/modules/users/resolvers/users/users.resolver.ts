import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { UserService } from '../../services/user/user.service';
import { User } from '../../obj-types/user/user.obj-type';
import { RegisterUserInput } from '../../inputs/register-user/register-user.input';

@Resolver(of => User)
export class UsersResolver {
  constructor(public userService: UserService) {}

  @Query(returns => [User])
  async getAll() {}

  @Mutation(returns => User)
  async registerUser(@Args('input') input: RegisterUserInput) {
    return await this.userService.registerUser(input);
  }
}
