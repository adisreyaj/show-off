import { Module } from '@nestjs/common';
import { DbModule } from '@show-off/db';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [DbModule],
  exports: [],
})
export class ApiUsersModule {}
