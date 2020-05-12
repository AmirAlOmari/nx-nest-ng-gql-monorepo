import { Provider } from '@angular/core';

import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { environment } from '../../../environments/environment';

export const createApolloOptions = (): Provider => {
  return {
    provide: APOLLO_OPTIONS,
    deps: [HttpLink],
    useFactory: (httpLink: HttpLink) => ({
      link: httpLink.create({ uri: environment.serverUrl }),
      cache: new InMemoryCache()
    })
  };
};
