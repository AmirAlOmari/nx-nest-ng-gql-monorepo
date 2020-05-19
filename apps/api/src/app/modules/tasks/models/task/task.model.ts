import { Ref, prop } from '@typegoose/typegoose';

import { User } from '../../../users/models/user/user.model';

export class Task {
  @prop({ ref: User })
  userId: Ref<User>;

  @prop({ required: true })
  name: string;

  @prop({ default: false })
  completed: boolean;

  @prop({ default: '' })
  description: string;

  @prop()
  date?: Date;
}
