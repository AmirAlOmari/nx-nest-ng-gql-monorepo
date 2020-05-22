import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LoginOutput {
  @Field()
  accessToken: string;
}
