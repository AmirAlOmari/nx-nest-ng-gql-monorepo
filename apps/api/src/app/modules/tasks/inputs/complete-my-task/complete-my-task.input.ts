import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CompleteMyTaskInput {
  @Field((type) => ID)
  _id: string;
}
