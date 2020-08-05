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

import { CreateMyTaskGQL, GetMyTasksDocument } from '@linkedout/data-access';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'frontend-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskDialogComponent implements OnInit, OnDestroy {
  constructor(
    public fb: FormBuilder,
    public snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    public createMyTaskGQL: CreateMyTaskGQL
  ) {}

  ngDestroy$ = new Subject<void>();

  isSubmitting$ = new BehaviorSubject<boolean>(false);

  createTaskForm = this.fb.group({
    name: this.fb.control(null, [Validators.required]),
    date: this.fb.control(null, [Validators.required]),
    description: this.fb.control(null),
  });

  async submit() {
    if (this.createTaskForm.invalid) {
      this.snackbar.open('Form is invalid', 'Close', {
        duration: 2000,
      });

      return;
    }

    const input = this.createTaskForm.value;

    this.isSubmitting$.next(true);

    await timer(1000).toPromise();

    this.createMyTaskGQL
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

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
