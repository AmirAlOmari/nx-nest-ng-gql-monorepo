import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMyTaskInput {
  @Field()
  name: string;

  @Field({ nullable: true, defaultValue: '' })
  description: string;

  @Field({ nullable: true })
  date?: string;
}
