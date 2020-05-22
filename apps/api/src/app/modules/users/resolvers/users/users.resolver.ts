import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DocumentType } from '@typegoose/typegoose';

// Shared module
import { GqlUser } from '../../../shared/decorators/gql-user/gql-user.decorator';

// Auth module
import { GqlAuthGuard } from '../../../auth/guards/gql-auth/gql-auth.guard';

// User module
import { User } from '../../models/user/user.model';
import { UserService } from '../../services/user/user.service';
import { User as UserObjectType } from '../../obj-types/user/user.obj-type';

@Resolver(of => UserObjectType)
export class UsersResolver {
  constructor(public userService: UserService) {}

  @Query(returns => UserObjectType)
  @UseGuards(GqlAuthGuard)
  async getMyUser(@GqlUser() user: DocumentType<User>) {
    return user;
  }
}
