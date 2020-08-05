import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-express';

// User module
import { User as UserObjectType } from '../../../users/obj-types/user/user.obj-type';

// Auth module
import { LoginOutput } from '../../outputs/login/login.output';
import { RegisterUserInput } from '../../inputs/register-user/register-user.input';
import { AuthService } from '../../services/auth/auth.service';
import { WrongCredentialsError } from '../../errors/wrong-credentials/wrong-credentials.error';

@Resolver()
export class AuthResolver {
  constructor(public authService: AuthService) {}

  @Mutation((returns) => LoginOutput)
  async login(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    try {
      const output = await this.authService.login(email, password);

      return output;
    } catch (error) {
      if (error instanceof WrongCredentialsError) {
        throw new AuthenticationError(error.message);
      }

      throw error;
    }
  }

  @Mutation((returns) => UserObjectType)
  async registerUser(@Args('input') input: RegisterUserInput) {
    return await this.authService.registerUser(input);
  }
}
