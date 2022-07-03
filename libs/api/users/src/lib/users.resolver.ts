import { Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CurrentUser } from '@show-off/api/shared';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query('me')
  me(@CurrentUser() user: CurrentUser) {
    return this.userService.findById(user.id);
  }
}
