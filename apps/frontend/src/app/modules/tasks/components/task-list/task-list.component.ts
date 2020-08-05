import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import {
  GetMyTasksGQL,
  GetMyTasksDocument,
  CompleteMyTaskGQL,
  Task,
} from '@linkedout/data-access';

import { CreateTaskDialogComponent } from '../../dialogs/create-task-dialog/create-task-dialog.component';
import {
  UpdateTaskDialogComponent,
  UpdateTaskDialogData,
} from '../../dialogs/update-task-dialog/update-task-dialog.component';
import {
  RemoveTaskDialogComponent,
  RemoveTaskDialogData,
} from '../../dialogs/remove-task-dialog/remove-task-dialog.component';

@Component({
  selector: 'frontend-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit, OnDestroy {
  constructor(
    public dialog: MatDialog,
    public getMyTasksGQL: GetMyTasksGQL,
    public completeMyTaskGQL: CompleteMyTaskGQL
  ) {}

  protected ngDestroy$ = new Subject<void>();

  public getMyTasks$ = this.getMyTasksGQL.watch().valueChanges;

  public loading$ = this.getMyTasks$.pipe(map(({ loading }) => loading));
  public tasks$ = this.getMyTasks$.pipe(map(({ data }) => data.getMyTasks));
  public errors$ = this.getMyTasks$.pipe(map(({ errors }) => errors));

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {});
  }

  openRemoveTaskDialog(task: Task) {
    const data: RemoveTaskDialogData = { task };
    const dialogRef = this.dialog.open(RemoveTaskDialogComponent, { data });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  openUpdateTaskDialog(task: Task) {
    const data: UpdateTaskDialogData = { task };
    const dialogRef = this.dialog.open(UpdateTaskDialogComponent, { data });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  completeTask(task: Task) {
    this.completeMyTaskGQL
      .mutate(
        { input: { _id: task._id } },
        { refetchQueries: [{ query: GetMyTasksDocument }] }
      )
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
