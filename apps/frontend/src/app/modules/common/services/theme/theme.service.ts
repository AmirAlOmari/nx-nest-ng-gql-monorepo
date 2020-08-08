import { Injectable, Inject, OnInit, OnDestroy } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { BehaviorSubject } from 'rxjs';

import { LoggerService } from '../../../common/services/logger/logger.service';

import { Themes } from '../../enums/themes/themes.enum';
import { STStorageKey } from '../../constants/selected-theme-storage-key/selected-theme-storage-key.const';

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements OnInit, OnDestroy {
  constructor(
    @Inject(LOCAL_STORAGE) public webStorageService: WebStorageService,
    public logger: LoggerService
  ) {
    /**
     *  Note: Ng doesn't call this hook for services 🤷‍♀️
     */
    this.ngOnInit();
  }

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _stream$ = new BehaviorSubject<Themes>(Themes.DeeppurpleAmber);

  public set(theme: Themes) {
    if (theme) {
      this.store(theme);
    }

    this._stream$.next(theme);
  }

  public get(): Themes {
    return this._stream$.value;
  }

  public stream$() {
    return this._stream$.asObservable();
  }

  public loading$() {
    return this._loading$.asObservable();
  }

  protected async store(data: Themes): Promise<void> {
    await this.webStorageService.set(STStorageKey, data);
  }

  protected async retrieve(): Promise<Themes | null> {
    return await this.webStorageService.get(STStorageKey);
  }

  protected async remove(): Promise<void> {
    await this.webStorageService.remove(STStorageKey);
  }

  protected async init() {
    const data = await this.retrieve();

    if (data) {
      this._stream$.next(data);
    } else {
      this.store(this.get());
    }

    this._loading$.next(false);
  }

  ngOnInit(): void {
    this.logger.debug(`${ThemeService.name}#ngOnInit(): instantiated 👋`);

    this.init();
  }

  ngOnDestroy(): void {}
}
