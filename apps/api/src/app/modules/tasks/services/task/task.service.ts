import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

import { Task } from '../../models/task/task.model';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task) public taskModel: ReturnModelType<typeof Task>
  ) {}

  // async createTask(createTaskDto: CreateTaskDto, context: CreateTaskContext) {}

  // async updateTask(updateTaskDto: UpdateTaskDto, context: UpdateTaskContext) {}

  // async completeTask(
  //   completeTaskDto: CompleteTaskDto,
  //   context: CompleteTaskContext
  // ) {}

  // async removeTask(removeTaskDto: RemoveTaskDto, context: RemoveTaskContext) {}

  async getAllTasksByUserId(userId: string) {
    const allUserTasks = await this.taskModel.find({ userId }).exec();

    return allUserTasks;
  }
}
