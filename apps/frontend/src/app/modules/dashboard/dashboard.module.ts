import { NgModule } from '@angular/core';

import { CommonModule } from '../common/common.module';

import { AuthModule } from '../auth/auth.module';

import { HeaderComponent } from './components/header/header.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [HeaderComponent, DashboardPageComponent, HomePageComponent],
  imports: [CommonModule, DashboardRoutingModule, AuthModule],
})
export class DashboardModule {}
