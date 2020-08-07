import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';

import { routeSlideInAnimation } from '../../../common/animations/route-slide-in/route-slide-in.animation';

import { DrawerButton } from '../../interfaces/drawer-button/drawer-button.interface';

@Component({
  selector: 'frontend-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routeSlideInAnimation],
})
export class DashboardPageComponent implements OnInit {
  constructor(public route: ActivatedRoute, public router: Router) {}

  @ViewChild('drawer')
  public drawer: MatDrawer;

  public drawerOpen = true;

  public drawerButtons: DrawerButton[] = [
    {
      title: 'Home',
      matIconName: 'home',
      navigate: {
        commands: ['./home'],
        extras: { relativeTo: this.route },
      },
    },
    {
      title: 'Tasks',
      matIconName: 'bookmarks',
      navigate: {
        commands: ['./tasks'],
        extras: { relativeTo: this.route },
      },
    },
  ];

  public prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }

  public onHeaderMenuClick() {
    if (!this.drawer) {
      return;
    }

    this.drawerOpen = !this.drawerOpen;
  }

  public onDrawerButtonClick(drawerButton: DrawerButton) {
    const { commands, extras } = drawerButton.navigate;

    return this.router.navigate(commands, extras);
  }

  protected navigateIfEmpty() {
    const url = this.router.url;
    const urlEndsWithDashboard = url.endsWith('/dashboard');

    if (urlEndsWithDashboard) {
      const firstDrawerButton = this.drawerButtons[0];
      const { commands, extras } = firstDrawerButton.navigate;

      this.router.navigate(commands, extras);
    }
  }

  ngOnInit(): void {
    this.navigateIfEmpty();
  }
}
