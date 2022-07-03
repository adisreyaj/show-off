import { Injectable } from '@nestjs/common';
import { PrismaService } from '@show-off/db';
import { CreateCollectionInput, QueryFilter } from '@show-off/api-interfaces';
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

  create(input: CreateCollectionInput, userId: string) {
    const data: Prisma.CollectionUncheckedCreateInput = {
      ...input,
      userId,
    };
    return this.prisma.collection.create({
      data,
      include: COLLECTION_INCLUDE,
    });
  }

  likeCollection(id: string, userId: string) {
    return this.prisma.collection.update({
      where: {
        id,
      },
      data: {
        likes: {
          create: {
            userId,
          },
        },
      },
      include: COLLECTION_INCLUDE,
    });
  }

  unlikeCollection(id: string, userId: string) {
    return this.prisma.like.deleteMany({
      where: {
        userId,
        collectionId: id,
      },
    });
  }
}
