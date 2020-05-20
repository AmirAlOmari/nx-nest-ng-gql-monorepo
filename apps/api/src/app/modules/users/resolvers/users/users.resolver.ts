import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { UserService } from '../../services/user/user.service';
import { User as UserObjectType } from '../../obj-types/user/user.obj-type';
import { RegisterUserInput } from '../../inputs/register-user/register-user.input';
import { LoginOutput } from '../../outputs/login/login.output';

@Resolver(of => UserObjectType)
export class UsersResolver {
  constructor(public userService: UserService) {}

  @Query(returns => [UserObjectType])
  async getAll() {
    return await this.userService.getAllUsers();
  }

  // TODO: should be moved to `auth` module
  @Mutation(returns => UserObjectType)
  async registerUser(@Args('input') input: RegisterUserInput) {
    return await this.userService.registerUser(input);
  }

  // TODO: should be moved to `auth` module
  @Mutation(returns => LoginOutput)
  async login(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    const output = await this.userService.login(email, password);

    return output;
  }
}
