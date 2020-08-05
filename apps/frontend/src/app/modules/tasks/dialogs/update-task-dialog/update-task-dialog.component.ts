import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, BehaviorSubject, timer } from 'rxjs';

import {
  UpdateMyTaskGQL,
  GetMyTasksDocument,
  Task,
} from '@linkedout/data-access';
import { takeUntil } from 'rxjs/operators';

export interface UpdateTaskDialogData {
  task: Task;
}

@Component({
  selector: 'frontend-update-task-dialog',
  templateUrl: './update-task-dialog.component.html',
  styleUrls: ['./update-task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateTaskDialogComponent implements OnInit, OnDestroy {
  constructor(
    public fb: FormBuilder,
    public snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateTaskDialogData,
    public updateMyTaskGQL: UpdateMyTaskGQL
  ) {}

  ngDestroy$ = new Subject<void>();

  isSubmitting$ = new BehaviorSubject<boolean>(false);

  updateTaskForm = this.fb.group({
    _id: this.fb.control(null),
    name: this.fb.control(null, [Validators.required]),
    date: this.fb.control(null, [Validators.required]),
    description: this.fb.control(null),
  });

  async submit() {
    if (this.updateTaskForm.invalid) {
      this.snackbar.open('Form is invalid', 'Close', {
        duration: 2000,
      });

      return;
    }

    const input = this.updateTaskForm.value;

    this.isSubmitting$.next(true);

    await timer(1000).toPromise();

    this.updateMyTaskGQL
      .mutate({ input }, { refetchQueries: [{ query: GetMyTasksDocument }] })
      .pipe(takeUntil(this.ngDestroy$))
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(
        (result) => {
          console.log(result);

          onFinally();

          this.dialogRef.close();
        },
        (error) => {
          const gqlErrors = error.graphQLErrors || [];

          const errorMessages = gqlErrors
            .map((e) => e?.message)
            .filter((e) => e);

          const errorMessage = errorMessages.join(', ');

          this.snackbar.open(errorMessage, 'Close', {
            duration: 2000,
          });

          console.error({ error });

          onFinally();
        }
      );

    const onFinally = () => {
      this.isSubmitting$.next(false);
    };
  }

  ngOnInit(): void {
    this.updateTaskForm.patchValue(this.data.task);
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
