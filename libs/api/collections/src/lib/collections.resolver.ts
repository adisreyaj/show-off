import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CollectionsService } from './collections.service';
import {
  CreateCollectionInput,
  CreateItemData,
  ItemUpdateInput,
  QueryArgs,
  UpdateCollectionInput,
} from '@show-off/api-interfaces';
import { CurrentUserId, Public } from '@show-off/api/shared';

@Resolver('Collection')
export class CollectionsResolver {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Public()
  @Query('collection')
  getCollectionById(@Args('id') id: string, @CurrentUserId() userId: string) {
    return this.collectionsService.findById(id, userId);
  }

  @Public()
  @Query('collections')
  getCollections(@Args('args') args: QueryArgs) {
    return this.collectionsService.find(args ?? {});
  }

  @Mutation('createCollection')
  createCollection(
    @Args('input') data: CreateCollectionInput,
    @CurrentUserId() userId: string
  ) {
    return this.collectionsService.create(data, userId);
  }

  @Mutation('deleteCollection')
  deleteCollection(
    @Args('id') collectionId: string,
    @CurrentUserId() userId: string
  ) {
    return this.collectionsService.delete(collectionId, userId);
  }

  @Mutation('updateCollection')
  updateCollection(
    @Args('id') id: string,
    @Args('input') input: UpdateCollectionInput,
    @CurrentUserId() userId: string
  ) {
    return this.collectionsService.update(id, userId, input);
  }

  @Mutation('addNewItemToCollection')
  addNewItemToCollection(
    @Args('id') id: string,
    @Args('input') data: { items: CreateItemData[] },
    @CurrentUserId() userId: string
  ) {
    return this.collectionsService.addNewItems(id, userId, data.items);
  }

  @Mutation('updateItem')
  updateItem(
    @Args('id') id: string,
    @Args('input') input: ItemUpdateInput,
    @CurrentUserId() userId: string
  ) {
    return this.collectionsService.updateItem(id, userId, input);
  }

  @Mutation('deleteItem')
  deleteItem(@Args('id') id: string, @CurrentUserId() userId: string) {
    return this.collectionsService.deleteItem(id, userId);
  }

  @Mutation('addItemToCollection')
  copyExistingItemToCollection(
    @Args('id') id: string,
    @Args('itemId') itemId: string,
    @CurrentUserId() userId: string
  ) {
    return this.collectionsService.addItem(id, userId, itemId);
  }

  @Mutation('likeCollection')
  likeCollection(@Args('id') id: string, @CurrentUserId() userId: string) {
    return this.collectionsService.like(id, userId);
  }

  @Mutation('unlikeCollection')
  unlikeCollection(@Args('id') id: string, @CurrentUserId() userId: string) {
    return this.collectionsService.unlike(id, userId);
  }

  @Mutation('commentOnCollection')
  commentOnCollection(
    @Args('id') id: string,
    @Args('comment') comment: string,
    @CurrentUserId() userId: string
  ) {
    return this.collectionsService.comment(id, userId, comment);
  }
}
