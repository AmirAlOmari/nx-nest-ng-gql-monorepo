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

import { LoginRouteQueryParams } from '../../enums/login-route-query-params/login-route-query-params.enum';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'frontend-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    public fb: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public snackbar: MatSnackBar,
    public authService: AuthService
  ) {}

  ngDestroy$ = new Subject<void>();

  loginForm = this.fb.group({
    email: this.fb.control(null, [Validators.required, Validators.email]),
    password: this.fb.control(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  isSubmitting$ = new BehaviorSubject<boolean>(false);

  passwordVisible = false;

  async submit() {
    if (this.loginForm.invalid) {
      this.snackbar.open('Form is invalid', 'Close', {
        duration: 2000,
      });

      return;
    }

    const { email, password } = this.loginForm.value;

    this.isSubmitting$.next(true);

    await timer(1000).toPromise();

    this.authService
      .login(email, password)
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(
        (gqlResult) => {
          console.log('Login: Succeed 🎉', gqlResult);

          onFinnaly();

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

          console.error('Login: GQL Error', { error });

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
