import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

// User module
import { User as UserObjectType } from '../../../users/obj-types/user/user.obj-type';

// Auth module
import { LoginOutput } from '../../outputs/login/login.output';
import { RegisterUserInput } from '../../inputs/register-user/register-user.input';
import { AuthService } from '../../services/auth/auth.service';

@Resolver()
export class AuthResolver {
  constructor(public authService: AuthService) {}

  @Query(returns => LoginOutput)
  async login(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    const output = await this.authService.login(email, password);

    return output;
  }

  @Mutation(returns => UserObjectType)
  async registerUser(@Args('input') input: RegisterUserInput) {
    return await this.authService.registerUser(input);
  }
}
