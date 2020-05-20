import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { JwtService } from '../../../jwt/services/jwt/jwt.service';
import { UserService } from '../../../users/services/user/user.service';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(
    public customJwtService: JwtService,
    public userService: UserService
  ) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    const { req } = ctx.getContext();

    const authToken = req?.headers?.authorization?.replace(/^Bearer /);

    if (!authToken) {
      return false;
    }

    let userId = null;

    try {
      ({ userId } = await this.customJwtService.verifyAsync(authToken));
    } catch (error) {
      return false;
    }

    const user = await this.userService.getUserById(userId);

    if (!user) {
      return false;
    }

    req.user = user;

    return true;
  }
}
