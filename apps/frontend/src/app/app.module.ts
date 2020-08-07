import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { DataAccessModule } from '@linkedout/data-access';

import { CommonModule } from './modules/common/common.module';

import { GraphQLModule } from './graphql.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    CommonModule,

    GraphQLModule,

    DataAccessModule,

    StoreModule.forRoot({}, {}),
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
