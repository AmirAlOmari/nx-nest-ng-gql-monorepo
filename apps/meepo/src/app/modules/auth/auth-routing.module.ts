import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { AuthModeResolveService } from './services/auth-mode-resolve/auth-mode-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent
  },
  {
    path: 'login',
    component: AuthPageComponent,
    resolve: {
      authMode: AuthModeResolveService
    }
  },
  {
    path: 'register',
    component: AuthPageComponent,
    resolve: {
      authMode: AuthModeResolveService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
