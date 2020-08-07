import { NgModule } from '@angular/core';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';

import { createApolloOptions } from './providers/apollo-options/apollo-options.provider';

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [createApolloOptions()],
})
export class GraphQLModule {}
