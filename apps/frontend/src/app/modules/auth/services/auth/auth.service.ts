import { Injectable, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { ApolloQueryResult, NetworkStatus } from 'apollo-client';
import { Observable, Subject, of, from, BehaviorSubject } from 'rxjs';
import { takeUntil, mergeMap, map, switchMap, tap, take } from 'rxjs/operators';

import { LoginGQL, LoginMutation } from '@linkedout/data-access';

import { LoggedUserInfo } from '../../../../interfaces/logged-user-info/logged-user-info.interface';
import { LoggedUserService } from '../../../../services/logged-user/logged-user.service';

import { LoginRouteQueryParams } from '../../enums/login-route-query-params/login-route-query-params.enum';
import { AccessTokenService } from '../access-token/access-token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public loggedUserService: LoggedUserService,
    public accessTokenService: AccessTokenService,
    public loginGQL: LoginGQL
  ) {}

  public ngDestroy$ = new Subject<void>();

  login(email: string, password: string) {
    return from(this.isLoggedIn()).pipe(
      // TODO: overthink, is it the clearest way to provide _optimistic_ response
      switchMap((isLoggedIn) =>
        // isLoggedIn
        //   ? from(this.accessTokenService.retrieveAccessToken()).pipe(
        //       map((accessToken) =>
        //         this.__fakeAppoloQueryResult<LoginMutation>({
        //           login: { accessToken },
        //         })
        //       )
        //     )
        //   :
        this.loginGQL.mutate({ email, password }).pipe(
          tap((gqlResult) => {
            if (!gqlResult?.data) {
              return;
            }

            const { accessToken, me } = gqlResult.data.login;

            const loggedUser: LoggedUserInfo = me;
            this.loggedUserService.set(loggedUser).then();

            this.accessTokenService.storeAccessToken(accessToken);
          })
        )
      ),
      takeUntil(this.ngDestroy$)
    );
  }

  // TODO: navigate somewhere (?) on logout
  async logout() {
    /**
     * Clear all allocated storages
     */
    await this.accessTokenService.removeAccessToken();

    return this.router.navigate(['/auth/login']);
  }

  async isLoggedIn() {
    const accessToken = await this.accessTokenService.retrieveAccessToken();

    return !!accessToken;
  }

  async createHttpAuthHeader() {
    const accessToken = await this.accessTokenService.retrieveAccessToken();
    const httpAuthHeader = `Bearer ${accessToken}`;

    return httpAuthHeader;
  }

  getCallbackFromActivatedRoute$(): Observable<string> {
    return this.route.queryParamMap.pipe(
      map((queryParamMap) => queryParamMap.get(LoginRouteQueryParams.CALLBACK))
    );
  }

  async navigateToIfUserLoggedIn(
    navigateCommands: any[] = ['/dashboard'],
    navigateExtras?: NavigationExtras
  ) {
    const isLoggedIn = await this.isLoggedIn();

    if (!isLoggedIn) {
      return;
    }

    const callback = await this.getCallbackFromActivatedRoute$()
      .pipe(take(1))
      .toPromise();

    let actualNavigateCommands = navigateCommands;
    let actualNavigateExtras = navigateExtras;

    if (callback) {
      actualNavigateCommands = [callback];
      actualNavigateExtras = undefined;
    }

    return this.router.navigate(actualNavigateCommands, actualNavigateExtras);
  }

  ngOnDestroy() {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  // TODO: move into some shared helper service, idk
  __fakeAppoloQueryResult<T = any>(data: T): ApolloQueryResult<T> {
    return {
      data,
      errors: [],
      loading: false,
      networkStatus: NetworkStatus.ready,
      stale: false,
    };
  }
}
