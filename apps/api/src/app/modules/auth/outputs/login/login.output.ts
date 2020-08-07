import { ObjectType, Field } from '@nestjs/graphql';

import { User } from '../../../users/obj-types/user/user.obj-type';

@ObjectType()
export class LoginOutput {
  @Field()
  accessToken: string;

  @Field(() => User)
  me: User;
}
