import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';

import { LoggedUserService } from '../../../common/services/logged-user/logged-user.service';

import { AuthService } from '../../../auth/services/auth/auth.service';

@Component({
  selector: 'frontend-dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    public authService: AuthService,
    public loggedUserService: LoggedUserService
  ) {}

  @Output()
  public menuClick = new EventEmitter<void>();

  public ngDestroy$ = new Subject<void>();

  public loggedUser$ = this.loggedUserService.stream$();

  public async logout() {
    await this.authService.logout();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
