import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRouteQueryParams } from './enums/login-route-query-params/login-route-query-params.enum';
import { AuthModeResolveService } from './services/auth-mode-resolve/auth-mode-resolve.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    children: [
      /**
       * @QueryParams `LoginRouteQueryParams`
       */
      {
        path: 'login',
        component: LoginComponent,
      },

      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
