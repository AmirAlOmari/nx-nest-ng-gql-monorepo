import * as mongoose from 'mongoose';

export class UpdateTaskDto {
  _id: string | mongoose.Types.ObjectId;
  name: string;
  description: string;
  date?: string;
}
