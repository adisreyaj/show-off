import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs';
import {
  Collection,
  CreateCollectionInput,
  QueryArgs,
} from '@show-off/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  constructor(private readonly apollo: Apollo) {}

  create(data: CreateCollectionInput) {
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

  getCollections(queryArgs: QueryArgs, refresh = false) {
    return this.apollo
      .query<{ collections: Collection[] }>({
        query: gql`
          query GetCollections($args: QueryArgs) {
            collections(args: $args) {
              id
              name
              items {
                id
                name
                type
              }
              user {
                id
                username
                firstName
                lastName
                image
              }
              createdAt
              updatedAt
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
          args: queryArgs,
        },
        fetchPolicy: refresh ? 'network-only' : 'cache-first',
      })
      .pipe(map((result) => result.data.collections));
  }

  getCollection(id: string, refresh = false) {
    return this.apollo
      .query<{ collection: Collection }>({
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
                links {
                  url
                  type
                }
              }
              comments {
                text
                user {
                  id
                  username
                  firstName
                  lastName
                  image
                }
              }
              liked
              private
              published
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

  like(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation LikeCollection($id: ID!) {
          likeCollection(id: $id) {
            id
          }
        }
      `,
      variables: {
        id,
      },
    });
  }

  unlike(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation UnlikeCollection($id: ID!) {
          unlikeCollection(id: $id) {
            id
          }
        }
      `,
      variables: {
        id,
      },
    });
  }

  comment(id: string, comment: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation CommentOnCollection($id: ID!, $comment: String!) {
          commentOnCollection(id: $id, comment: $comment) {
            id
          }
        }
      `,
      variables: {
        id,
        comment,
      },
    });
  }

  updateVisibility(id: string, isPrivate: boolean) {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateVisibilityStatus(
          $id: ID!
          $input: UpdateCollectionInput!
        ) {
          updateCollection(id: $id, input: $input) {
            id
          }
        }
      `,
      variables: {
        id,
        input: {
          private: isPrivate,
        },
      },
    });
  }
}
