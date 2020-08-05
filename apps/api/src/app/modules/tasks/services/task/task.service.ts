import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';

// Users module
import { User } from '../../../users/models/user/user.model';

// Task module
import { CreateTaskDto } from '../../dtos/create-task/create-task.dto';
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

  async createTaskForUser(
    user: DocumentType<User>,
    createTaskDto: CreateTaskDto
  ) {
    const createdTask = await new this.taskModel({
      ...createTaskDto,
      userId: user._id,
    }).save();

    return createdTask;
  }
}
