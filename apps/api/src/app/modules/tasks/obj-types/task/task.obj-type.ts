import { ObjectType, Field, ID } from '@nestjs/graphql';

import { User } from '../../../users/obj-types/user/user.obj-type';

@ObjectType()
export class Task {
  @Field((type) => ID)
  _id: string;

  @Field()
  user: User;

  @Field()
  userId: string;

  @Field()
  name: string;

  @Field()
  completed: boolean;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  date?: Date;
}
