import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { DataAccessModule } from "@linkedout/data-access";

import { GraphQLModule } from './graphql.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, GraphQLModule, DataAccessModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
