import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CollectionsService } from './collections.service';
import { CreateCollectionInput, QueryFilter } from '@show-off/api-interfaces';
import { CurrentUserId } from '@show-off/api/shared';

@Resolver('Collection')
export class CollectionsResolver {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Query('collection')
  getCollectionById(@Args('id') id: string) {
    return this.collectionsService.findById(id);
  }

  @Query('collections')
  getCollections(@Args('filters') filters: QueryFilter) {
    return this.collectionsService.find(filters ?? {});
  }

  @Mutation('createCollection')
  createCollection(
    @Args('input') data: CreateCollectionInput,
    @CurrentUserId() userId: string
  ) {
    return this.collectionsService.create(data, userId);
  }

  @Mutation('addNewItemToCollection')
  addNewItemToCollection(
    @Args('id') id: string,
    @Args('input') data: { items: any[] },
    @CurrentUserId() userId: string
  ) {
    return this.collectionsService.addNewItems(id, userId, data.items);
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
}
