import { Injectable, OnInit, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';

import { LoggedUserInfo } from '../../interfaces/logged-user-info/logged-user-info.interface';
import { LUStorageKey } from '../../constants/logged-user-storage-key/logged-user-storage-key.const';

@Injectable({
  providedIn: 'root',
})
export class LoggedUserService implements OnInit {
  constructor(
    @Inject(LOCAL_STORAGE) public webStorageService: WebStorageService
  ) {
    /**
     *  Note: Ng doesn't call this hook for services 🤷‍♀️
     */
    this.ngOnInit();
  }

  protected _stream$ = new BehaviorSubject<LoggedUserInfo | null>(null);

  public stream$() {
    return this._stream$.asObservable();
  }

  public async get(): Promise<LoggedUserInfo | null> {
    return this._stream$.getValue();
  }

  public async set(loggedUser: LoggedUserInfo | null) {
    if (loggedUser) {
      await this.store(loggedUser);
    } else {
      await this.remove();
    }

    this._stream$.next(loggedUser);
  }

  protected async store(data: LoggedUserInfo): Promise<void> {
    const stringifiedData = JSON.stringify(data);

    await this.webStorageService.set(LUStorageKey, stringifiedData);
  }

  protected async retrieve(): Promise<LoggedUserInfo | null> {
    const retrieved = await this.webStorageService.get(LUStorageKey);
    const parsed = retrieved && JSON.parse(retrieved);

    return parsed;
  }

  protected async remove(): Promise<void> {
    await this.webStorageService.remove(LUStorageKey);
  }

  protected async initLoggedUser() {
    const loggedUser = await this.retrieve();

    if (loggedUser) {
      this._stream$.next(loggedUser);
    }
  }

  ngOnInit() {
    console.log('LoggedUserService#ngOnInit(): here 👋');
    this.initLoggedUser();
  }
}
