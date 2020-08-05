import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class RemoveMyTaskInput {
  @Field((type) => ID)
  _id: string;
}
