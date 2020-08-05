import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { DataAccessModule } from '@linkedout/data-access';

import { LoggedUserService } from './services/logged-user/logged-user.service';
import { GraphQLModule } from './graphql.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    GraphQLModule,

    DataAccessModule,

    StoreModule.forRoot({}, {}),
    AppRoutingModule,
  ],
  providers: [LoggedUserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
