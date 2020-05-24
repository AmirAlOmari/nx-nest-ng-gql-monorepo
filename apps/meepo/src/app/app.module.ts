import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { DataAccessModule } from "@linkedout/data-access";

import { GraphQLModule } from './graphql.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, GraphQLModule, DataAccessModule, StoreModule.forRoot({}, {})],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
