import { Query, Resolver } from '@nestjs/graphql';
import { Public } from '@show-off/api/shared';

@Resolver()
export class AppResolver {
  @Public()
  @Query('ping')
  status() {
    return {
      success: true,
    };
  }
}
