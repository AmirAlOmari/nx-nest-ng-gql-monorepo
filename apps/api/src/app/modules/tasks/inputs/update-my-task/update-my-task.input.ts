import { InputType, PartialType, Field, ID } from '@nestjs/graphql';

import { CreateMyTaskInput } from '../create-my-task/create-my-task.input';

@InputType()
export class UpdateMyTaskInput extends CreateMyTaskInput {
  @Field((type) => ID)
  _id: string;
}
