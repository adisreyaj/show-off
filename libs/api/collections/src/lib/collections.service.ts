import { Injectable } from '@nestjs/common';
import { PrismaService } from '@show-off/db';
import { QueryFilter } from '@show-off/api-interfaces';
import { Prisma } from '@prisma/client';

const COLLECTION_INCLUDE: Prisma.CollectionInclude = {
  likes: true,
  items: true,
  comments: true,
  shares: true,
  user: true,
  _count: {
    select: {
      likes: true,
      items: true,
      comments: true,
      shares: true,
    },
  },
};

@Injectable()
export class CollectionsService {
  constructor(private readonly prisma: PrismaService) {}

  find({ take = 100, skip = 0 }: QueryFilter) {
    return this.prisma.collection.findMany({
      take,
      skip,
      include: COLLECTION_INCLUDE,
    });
  }

  findById(id: string) {
    return this.prisma.collection.findUnique({
      where: { id },
      rejectOnNotFound: true,
      include: COLLECTION_INCLUDE,
    });
  }

  create(data: any) {
    return this.prisma.collection.create({
      data,
      include: COLLECTION_INCLUDE,
    });
  }
}
