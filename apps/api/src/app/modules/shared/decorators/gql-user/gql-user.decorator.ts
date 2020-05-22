import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { DocumentType } from '@typegoose/typegoose';

import { User } from '../../../users/models/user/user.model';

export const GqlUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const user: DocumentType<User> = GqlExecutionContext.create(context).getContext().req.user;

    if (!user) {
      throw new Error('Unexpected');
    }

    return user;
  }
);
