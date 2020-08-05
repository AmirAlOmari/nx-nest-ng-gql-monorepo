import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType, DocumentType, mongoose } from '@typegoose/typegoose';

// Users module
import { User } from '../../../users/models/user/user.model';

// Task module
import { CreateTaskDto } from '../../dtos/create-task/create-task.dto';
import { UpdateTaskDto } from '../../dtos/update-task/update-task.dto';
import { Task } from '../../models/task/task.model';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task) public taskModel: ReturnModelType<typeof Task>
  ) {}

  // async createTask(createTaskDto: CreateTaskDto, context: CreateTaskContext) {}

  // async updateTask(updateTaskDto: UpdateTaskDto, context: UpdateTaskContext) {}

  async completeTask(
    taskId: string | mongoose.Types.ObjectId
    // context: CompleteTaskContext
  ) {
    try {
      const task = await this.taskModel.findById(taskId);

      if (!task) {
        throw new Error('Task not found'); // TODO:
      }

      task.completed = true;

      await task.save();

      return task;
    } catch (error) {
      throw error;
    }
  }

  async removeTask(taskId: string | mongoose.Types.ObjectId) {
    try {
      const task = await this.taskModel.findById(taskId);

      if (!task) {
        throw new Error('Task not found'); // TODO:
      }

      task.completed = true;

      await task.remove();

      return task;
    } catch (error) {
      throw error;
    }
  }

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

  async updateTaskForUser(
    user: DocumentType<User>,
    updateTaskDto: UpdateTaskDto
  ) {
    try {
      const task = await this.taskModel.findById(updateTaskDto._id);

      if (!task) {
        throw new Error('Task not found'); // TODO:
      }

      task.name = updateTaskDto.name;
      task.date = new Date(updateTaskDto.date);
      task.description = updateTaskDto.description;

      await task.save();

      return task;
    } catch (error) {
      throw error;
    }
  }
}
