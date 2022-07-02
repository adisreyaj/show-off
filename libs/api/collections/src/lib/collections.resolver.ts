import { Args, Query, Resolver } from '@nestjs/graphql';
import { CollectionsService } from './collections.service';
import { QueryFilter } from '@show-off/api-interfaces';

@Resolver('Collection')
export class CollectionsResolver {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Query('collection')
  getCollectionById(@Args('id') id: string) {
    return this.collectionsService.findById(id);
  }
  @Query('collections')
  getCollections(@Args('filters') filters: QueryFilter) {
    return this.collectionsService.find(filters);
  }
}
