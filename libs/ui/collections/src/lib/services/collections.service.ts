import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  constructor(private readonly apollo: Apollo) {}

  create(data: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateCollection($input: CreateCollectionInput!) {
          createCollection(input: $input) {
            id
            name
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        input: data,
      },
    });
  }

  // TODO: Type this
  getCollections() {
    return this.apollo
      .query<{ collections: any[] }>({
        query: gql`
          query GetCollections {
            collections {
              id
              name
              _count {
                likes
                shares
                comments
                items
              }
            }
          }
        `,
      })
      .pipe(map((result) => result.data.collections));
  }
}
