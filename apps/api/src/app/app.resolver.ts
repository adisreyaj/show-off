import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query('ping')
  status() {
    return {
      success: true,
    };
  }
}
