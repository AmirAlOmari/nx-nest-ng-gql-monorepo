import { Provider } from '@angular/core';

import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-angular-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { environment } from '../../../environments/environment';

import { AccessTokenService } from '../../modules/auth/services/access-token/access-token.service';

export const createApolloOptions = (): Provider => {
  return {
    provide: APOLLO_OPTIONS,
    deps: [HttpLink, AccessTokenService],
    useFactory: (
      httpLinkCreator: HttpLink,
      accessTokenService: AccessTokenService
    ) => {
      const uri = `${environment.serverUrl}/graphql`;

      const authLink = setContext(async (operation, context) => {
        const accessToken = await accessTokenService.retrieveAccessToken();

        if (!accessToken) {
          return;
        }

        return {
          headers: {
            Authorization: `Bearer ${await accessTokenService.retrieveAccessToken()}`
          }
        };
      });

      const httpLink = httpLinkCreator.create({ uri });

      return {
        link: ApolloLink.from([authLink, httpLink]),
        cache: new InMemoryCache()
      };
    }
  };
};
