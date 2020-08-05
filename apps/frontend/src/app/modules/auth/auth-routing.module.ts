import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRouteQueryParams } from './enums/login-route-query-params/login-route-query-params.enum';
import { AuthModeResolveService } from './services/auth-mode-resolve/auth-mode-resolve.service';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
  },

  /**
   * @QueryParams `LoginRouteQueryParams`
   */
  {
    path: 'login',
    component: AuthPageComponent,
    resolve: {
      authMode: AuthModeResolveService,
    },
  },

  {
    path: 'register',
    component: AuthPageComponent,
    resolve: {
      authMode: AuthModeResolveService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
