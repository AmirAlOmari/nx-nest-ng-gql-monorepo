import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, of, from } from 'rxjs';
import { takeUntil, mergeMap, map, pluck, share, tap, shareReplay } from 'rxjs/operators';

import { AuthMode } from '../../enums/auth-mode/auth-mode.enum';

@Component({
  selector: 'meepo-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPageComponent implements OnInit, OnDestroy {
  constructor(public route: ActivatedRoute, public router: Router) {}

  ngDestroy$ = new Subject<void>();

  authMode$ = this.route.data.pipe(pluck('authMode'), shareReplay(1));

  isLoginAuthMode$ = this.authMode$.pipe(
    map(authMode => authMode === AuthMode.Login),
    share()
  );
  isRegisterAuthMode$ = this.authMode$.pipe(
    map(authMode => authMode === AuthMode.Register),
    share()
  );

  ngOnInit() {
    this.route.url.pipe(takeUntil(this.ngDestroy$)).subscribe(urlSegment => {
      const url = urlSegment.join();

      /**
       * TODO: do smthng with that dirty hack
       */
      if (!url.includes('login') && !url.includes('register')) {
        this.router.navigate(['./login'], { relativeTo: this.route, replaceUrl: true });
      }
    });
  }

  ngOnDestroy() {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
