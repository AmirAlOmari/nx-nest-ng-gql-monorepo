import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NgMaterialModule } from '../ng-material/ng-material.module';

import { AuthRoutingModule } from './auth-routing.module';
import { AccessTokenService } from './services/access-token/access-token.service';
import { AuthService } from './services/auth/auth.service';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,

    NgMaterialModule,

    AuthRoutingModule,
  ],
  declarations: [LoginComponent, RegisterComponent, AuthPageComponent],
  providers: [
    AccessTokenService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
