import { HttpLink } from 'apollo-angular/http';
import { environment } from '../../environments/environment';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { importProvidersFrom } from '@angular/core';

export const APOLLO_PROVIDERS = [
  importProvidersFrom(ApolloModule),
  {
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
    deps: [HttpLink],
  },
];

function createApollo(httpLink: HttpLink) {
  const gqlAPI = `${environment.apiURL}/graphql`;

  const link = ApolloLink.from([
    httpLink.create({ uri: gqlAPI, withCredentials: true }),
  ]);
  const cache = new InMemoryCache();

  return {
    link,
    cache,
  };
}
