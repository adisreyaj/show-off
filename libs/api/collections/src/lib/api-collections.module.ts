import { Module } from '@nestjs/common';

import { DbModule } from '@show-off/db';

import { CollectionsResolver } from './collections.resolver';
import { CollectionsService } from './collections.service';

@Module({
  providers: [CollectionsResolver, CollectionsService],
  imports: [DbModule],
})
export class ApiCollectionsModule {}
