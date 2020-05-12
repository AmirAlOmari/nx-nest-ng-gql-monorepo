import { InputType, Field, Int } from '@nestjs/graphql';

import { User } from '../../models/user/user.model';

@InputType()
export class PutUserInput {
  @Field()
  email: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;
}
