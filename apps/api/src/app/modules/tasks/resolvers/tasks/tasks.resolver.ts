import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent
} from '@nestjs/graphql';
import { DocumentType } from '@typegoose/typegoose';

import { GqlUser } from '../../../shared/decorators/gql-user/gql-user.decorator';
import { UserService } from '../../../users/services/user/user.service';
import { User as UserObjectType } from '../../../users/obj-types/user/user.obj-type';

import { TaskService } from '../../services/task/task.service';
import { Task as TaskObjectType } from '../../obj-types/task/task.obj-type';
import { User } from '../../../users/models/user/user.model';

@Resolver(of => TaskObjectType)
export class TasksResolver {
  constructor(
    public taskService: TaskService,
    public userService: UserService
  ) {}

  @ResolveField(returns => UserObjectType)
  async user(@Parent() task: TaskObjectType) {
    const user = await this.userService.getUserById(task.userId);

    return user;
  }

  @Query(returns => [TaskObjectType])
  async getMyTasks(@GqlUser() user: DocumentType<User>) {
    const myTasks = await this.taskService.getAllTasksByUserId(user._id);

    return myTasks;
  }

  @Mutation(returns => TaskObjectType)
  async createTask() {}

  @Mutation(returns => TaskObjectType)
  async updateTask() {}

  @Mutation(returns => TaskObjectType)
  async completeTask() {}

  @Mutation(returns => TaskObjectType)
  async removeTask() {}
}
