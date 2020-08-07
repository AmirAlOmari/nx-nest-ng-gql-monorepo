import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  OnDestroy,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, BehaviorSubject, timer } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';

import {
  RemoveMyTaskGQL,
  GetMyTasksDocument,
  Task,
} from '@linkedout/data-access';

import { LoggerService } from '../../../common/services/logger/logger.service';

export interface RemoveTaskDialogData {
  task: Task;
}

@Component({
  selector: 'frontend-remove-task-dialog',
  templateUrl: './remove-task-dialog.component.html',
  styleUrls: ['./remove-task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveTaskDialogComponent implements OnInit, OnDestroy {
  constructor(
    public dialogRef: MatDialogRef<RemoveTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RemoveTaskDialogData,
    public removeMyTaskGQL: RemoveMyTaskGQL,
    public logger: LoggerService
  ) {}

  ngDestroy$ = new Subject<void>();

  isSubmitting$ = new BehaviorSubject<boolean>(false);

  async submit() {
    this.isSubmitting$.next(true);

    await timer(1000).toPromise();

    this.removeMyTaskGQL
      .mutate(
        { input: { _id: this.data.task._id } },
        {
          refetchQueries: [{ query: GetMyTasksDocument }],
          awaitRefetchQueries: true,
        }
      )
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(
        (result) => {
          this.logger.debug(result);

          onFinally();

          this.dialogRef.close();
        },
        (error) => {
          console.error(error);

          onFinally();
        }
      );

    const onFinally = () => {
      this.isSubmitting$.next(false);
    };
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
