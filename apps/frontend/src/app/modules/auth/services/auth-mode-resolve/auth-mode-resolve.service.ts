import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuthMode } from '../../enums/auth-mode/auth-mode.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthModeResolveService implements Resolve<AuthMode> {
  determineAuthModeByRoute(route: ActivatedRouteSnapshot): AuthMode {
    const url = route.url.join();

    switch (true) {
      case url.includes('login'):
        return AuthMode.Login;

      case url.includes('register'):
        return AuthMode.Register;

      default:
        return AuthMode.Login;
        break;
    }
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<AuthMode> | Observable<never> {
    const authMode = this.determineAuthModeByRoute(route);

    return of(authMode);
  }
}
