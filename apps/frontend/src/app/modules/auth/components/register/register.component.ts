import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, BehaviorSubject, timer } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

import { RegisterUserGQL } from '@linkedout/data-access';

import { LoggerService } from '../../../common/services/logger/logger.service';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'frontend-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit, OnDestroy {
  constructor(
    public fb: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public snackbar: MatSnackBar,
    public registerUserGQL: RegisterUserGQL,
    public logger: LoggerService,
    public authService: AuthService
  ) {}

  ngDestroy$ = new Subject<void>();

  registerForm = this.fb.group({
    firstName: this.fb.control(null, [Validators.required]),
    lastName: this.fb.control(null, [Validators.required]),
    email: this.fb.control(null, [Validators.required, Validators.email]),
    password: this.fb.control(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  isSubmitting$ = new BehaviorSubject<boolean>(false);

  passwordVisible = false;

  async submit() {
    if (this.registerForm.invalid) {
      this.snackbar.open('Form is invalid', 'Close', {
        duration: 2000,
      });

      return;
    }

    const { firstName, lastName, email, password } = this.registerForm.value;

    this.isSubmitting$.next(true);

    await timer(1000).toPromise();

    this.registerUserGQL
      .mutate({ input: { firstName, lastName, email, password } })
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(
        async (gqlResult) => {
          this.logger.debug('Register: Succeed 🎉', gqlResult);

          onFinnaly();

          await this.authService.login(email, password).toPromise();

          this.authService.navigateToIfUserLoggedIn(['/dashboard'], {
            relativeTo: this.route,
          });
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

          console.error('Register: GQL Error', { error });

          onFinnaly();
        }
      );

    const onFinnaly = () => {
      this.isSubmitting$.next(false);
    };
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
