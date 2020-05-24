import { Injectable, OnDestroy, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { ApolloQueryResult, NetworkStatus } from 'apollo-client';
import { Subject, of, from } from 'rxjs';
import { takeUntil, mergeMap, map } from 'rxjs/operators';

import { LoginGQL, LoginQuery } from '@linkedout/data-access';

import { ATStorageKey } from '../../constants/at-storage-key/at-storage-key.const';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  constructor(
    @Inject(LOCAL_STORAGE) public webStorageService: WebStorageService,
    public loginGQL: LoginGQL
  ) {}

  ngDestroy$ = new Subject<void>();

  login(email: string, password: string) {
    return from(this.isLoggedIn()).pipe(
      // TODO: overthink, is it the clearest way to provide _optimistic_ response
      mergeMap(isLoggedIn =>
        isLoggedIn
          ? from(this.retrieveAccessToken()).pipe(
              map(accessToken =>
                this.__fakeAppoloQueryResult<LoginQuery>({
                  login: { accessToken }
                })
              )
            )
          : this.loginGQL.fetch({ email, password })
      ),
      takeUntil(this.ngDestroy$)
    );
  }

  // TODO: navigate somewhere (?) on logout
  async logout() {
    await this.removeAccessToken();
  }

  async isLoggedIn() {
    const accessToken = await this.retrieveAccessToken();

    return !!accessToken;
  }

  async storeAccessToken(accessToken: string) {
    await this.webStorageService.set(ATStorageKey, accessToken);
  }

  async retrieveAccessToken() {
    return (await this.webStorageService.get(ATStorageKey)) as string;
  }

  async removeAccessToken() {
    await this.webStorageService.remove(ATStorageKey);
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
      stale: false
    };
  }
}
