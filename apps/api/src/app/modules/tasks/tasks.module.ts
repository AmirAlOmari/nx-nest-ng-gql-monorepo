import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

// Shared module
import { SharedModule } from '../shared/shared.module';

// Jwt module
import { JwtModule } from '../jwt/jwt.module';

// Users module
import { UsersModule } from '../users/users.module';

// Auth module
import { AuthModule } from '../auth/auth.module';

// Task module
import { Task } from './models/task/task.model';
import { TaskService } from './services/task/task.service';
import { TasksResolver } from './resolvers/tasks/tasks.resolver';

@Module({
  imports: [
    TypegooseModule.forFeature([Task]),
    SharedModule,
    JwtModule,
    UsersModule,
    AuthModule
  ],
  providers: [TaskService, TasksResolver],
  exports: [TaskService]
})
export class TasksModule {}
