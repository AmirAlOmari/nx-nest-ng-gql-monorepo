import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { SharedModule } from '../shared/shared.module';
import { UsersModule } from '../users/users.module';

import { TaskService } from './services/task/task.service';
import { Task } from './models/task/task.model';

@Module({
  imports: [TypegooseModule.forFeature([Task]), SharedModule, UsersModule],
  providers: [TaskService],
  exports: [TaskService]
})
export class TasksModule {}
