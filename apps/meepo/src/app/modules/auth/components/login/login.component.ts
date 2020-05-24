import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'meepo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(public authService: AuthService, public fb: FormBuilder) {}

  ngDestroy$ = new Subject<void>();
  loginForm = this.fb.group({
    email: this.fb.control(null, [Validators.required, Validators.email]),
    password: this.fb.control(null, [
      Validators.required,
      Validators.minLength(4)
    ])
  });

  submit() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService
      .login(email, password)
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(
        gqlResult => {
          console.log('login', gqlResult);
        },
        error => {
          console.warn(error);
        }
      );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
