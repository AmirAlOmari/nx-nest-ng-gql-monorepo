import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, from } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // TODO: explore UrlTree to [de]navigate with the latest approach
    return from(this.authService.isLoggedIn()).pipe(
      map((isLoggedIn) => isLoggedIn || this.router.parseUrl('/auth/login'))
    );
  }
}
