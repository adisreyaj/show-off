import { PrismaService } from '@show-off/db';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        collections: true,
        comments: true,
        items: true,
        likes: true,
        shares: true,
      },
    });
  }
}
