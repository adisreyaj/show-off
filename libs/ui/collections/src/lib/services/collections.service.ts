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

  addNewItem(collectionId: string, item: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation AddNewItemToCollection(
          $id: ID!
          $input: AddNewItemsToCollectionInput!
        ) {
          addNewItemToCollection(id: $id, input: $input) {
            id
            name
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        id: collectionId,
        input: {
          items: [item],
        },
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
              user {
                id
                username
                firstName
                lastName
                image
                email
              }
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

  getCollection(id: string, refresh = false) {
    return this.apollo
      .query<{ collection: any }>({
        query: gql`
          query GetCollection($id: ID!) {
            collection(id: $id) {
              id
              name
              user {
                id
                username
                firstName
                lastName
                image
                email
              }
              items {
                id
                name
                description
                make
                price
                metadata
                type
              }
              _count {
                likes
                shares
                comments
                items
              }
            }
          }
        `,
        variables: {
          id,
        },
        fetchPolicy: refresh ? 'network-only' : 'cache-first',
      })
      .pipe(map((result) => result.data.collection));
  }
}