import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AuthModeResolveService } from './modules/auth/services/auth-mode-resolve/auth-mode-resolve.service';
// import { AuthPageComponent } from './modules/auth/pages/auth-page/auth-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule)
  }
  // {
  //   path: 'login',
  //   component: AuthPageComponent,
  //   resolve: {
  //     authMode: AuthModeResolveService
  //   }
  // },
  // {
  //   path: 'register',
  //   component: AuthPageComponent,
  //   resolve: {
  //     authMode: AuthModeResolveService
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
