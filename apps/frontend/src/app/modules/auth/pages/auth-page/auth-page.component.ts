import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject, of, from, combineLatest, BehaviorSubject, timer } from 'rxjs';
import {
  takeUntil,
  switchMap,
  mergeMap,
  map,
  pluck,
  share,
  tap,
  take,
  delay,
} from 'rxjs/operators';

import { Message } from '@linkedout/api-interfaces';

import { Themes } from '../../../common/enums/themes/themes.enum';
import { AvailableTheme } from '../../../common/interfaces/available-theme/available-theme.interface';
import { fadeInAnimation } from '../../../common/animations/fade-in/fade-in.animation';
import { ThemeService } from '../../../common/services/theme/theme.service';

import { AuthMode } from '../../enums/auth-mode/auth-mode.enum';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'frontend-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation],
})
export class AuthPageComponent implements OnInit, OnDestroy {
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public http: HttpClient,
    public themeService: ThemeService,
    public authService: AuthService
  ) {}

  private hello$ = timer(300).pipe(
    switchMap(() => this.http.get<Message>('/api/hello'))
  );

  hello: Message | null = null;

  ngDestroy$ = new Subject<void>();

  authMode$ = this.route.data.pipe(pluck('authMode'));

  isPageLoading$ = new BehaviorSubject<boolean>(true);

  isLoginAuthMode$ = this.authMode$.pipe(
    map((authMode) => authMode === AuthMode.Login),
    share()
  );
  isRegisterAuthMode$ = this.authMode$.pipe(
    map((authMode) => authMode === AuthMode.Register),
    share()
  );

  subscribeToHello() {
    this.hello$.pipe(takeUntil(this.ngDestroy$)).subscribe((hello) => {
      this.hello = hello;
    });
  }

  decideNavigation() {
    combineLatest([this.route.url, from(this.authService.isLoggedIn())])
      .pipe(delay(300), takeUntil(this.ngDestroy$))
      .subscribe(([urlSegment, isLoggedIn]) => {
        if (isLoggedIn) {
          return this.authService.navigateToIfUserLoggedIn();
        }

        const url = urlSegment.join();

        if (!url.includes('login') && !url.includes('register')) {
          this.router.navigate(['./login'], {
            relativeTo: this.route,
            replaceUrl: true,
          });
        }

        this.isPageLoading$.next(false);
      });
  }

  ngOnInit() {
    this.decideNavigation();
    this.subscribeToHello();
  }

  ngOnDestroy() {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
