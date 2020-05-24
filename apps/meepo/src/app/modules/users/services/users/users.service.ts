import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { GetMyUserGQL } from '@linkedout/data-access';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnDestroy {
  constructor(public getMyUserGQL: GetMyUserGQL) {}

  ngDestroy$ = new Subject<void>();

  watchMyUser() {
    return this.getMyUserGQL
      .watch()
      .valueChanges.pipe(takeUntil(this.ngDestroy$));
  }

  ngOnDestroy() {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
