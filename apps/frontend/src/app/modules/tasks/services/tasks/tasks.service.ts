import { Injectable, OnDestroy } from '@angular/core';
import { Subject, VirtualTimeScheduler } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  GetMyTasksGQL,
  CreateMyTaskGQL,
  UpdateMyTaskGQL,
  RemoveMyTaskGQL,
  CompleteMyTaskGQL,
} from '@linkedout/data-access';

import { CreateTaskDto } from '../../dtos/create-task/create-task.dto';
import { UpdateTaskDto } from '../../dtos/update-task/update-task.dto';
import { RemoveTaskDto } from '../../dtos/remove-task/remove-task.dto';
import { CompleteTaskDto } from '../../dtos/complete-task/complete-task.dto';

@Injectable({
  providedIn: 'root',
})
export class TasksService implements OnDestroy {
  constructor(
    public getMyTasksGQL: GetMyTasksGQL,
    public createMyTaskGQL: CreateMyTaskGQL,
    public updateMyTaskGQL: UpdateMyTaskGQL,
    public removeMyTaskGQL: RemoveMyTaskGQL,
    public completeMyTaskGQL: CompleteMyTaskGQL
  ) {}

  ngDestroy$ = new Subject<void>();

  watchMyTasks() {
    return this.getMyTasksGQL
      .watch()
      .valueChanges.pipe(takeUntil(this.ngDestroy$));
  }

  createTask(createTaskDto: CreateTaskDto) {
    return this.createMyTaskGQL
      .mutate({
        input: createTaskDto,
      })
      .pipe(takeUntil(this.ngDestroy$));
  }

  updateTask(updateTaskDto: UpdateTaskDto) {
    return this.updateMyTaskGQL
      .mutate({
        input: updateTaskDto,
      })
      .pipe(takeUntil(this.ngDestroy$));
  }

  removeTask(removeTaskDto: RemoveTaskDto) {
    return this.removeMyTaskGQL
      .mutate({
        input: removeTaskDto,
      })
      .pipe(takeUntil(this.ngDestroy$));
  }

  completeTask(completeTaskDto: CompleteTaskDto) {
    return this.completeMyTaskGQL
      .mutate({
        input: completeTaskDto,
      })
      .pipe(takeUntil(this.ngDestroy$));
  }

  ngOnDestroy() {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
