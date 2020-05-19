import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { DocumentType } from '@typegoose/typegoose';

import { User } from '../../../users/models/user/user.model';

export const GqlUser = createParamDecorator<
  unknown,
  ExecutionContext,
  DocumentType<User>
>(
  (data: unknown, context: ExecutionContext) =>
    GqlExecutionContext.create(context).getContext().req.user
);
