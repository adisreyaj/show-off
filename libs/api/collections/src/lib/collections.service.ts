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

  like(id: string, userId: string) {
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

  unlike(id: string, userId: string) {
    return this.prisma.like.deleteMany({
      where: {
        userId,
        collectionId: id,
      },
    });
  }

  //TODO: Type this
  addNewItems(id: string, userId: string, input: any[]) {
    return this.prisma.collection.update({
      where: {
        id,
      },
      data: {
        items: {
          create: input.map((item) => ({
            ...item,
            userId,
          })),
        },
      },
      include: COLLECTION_INCLUDE,
    });
  }

  /**
   * Copy the item from one collection to another
   *
   * @param id - collection id
   * @param userId - current user id
   * @param itemId - item id
   */
  async addItem(id: string, userId: string, itemId: string) {
    const item = await this.prisma.item.findUnique({
      where: {
        id: itemId,
      },
      select: {
        name: true,
        description: true,
        images: true,
        type: true,
        links: true,
      },
    });

    if (!item) {
      throw new Error('Item not found');
    }

    return this.prisma.collection.update({
      where: {
        id,
      },
      data: {
        items: {
          create: {
            ...item,
            userId,
          },
        },
      },
      include: COLLECTION_INCLUDE,
    });
  }

  comment(id: string, userId: string, text: string) {
    return this.prisma.collection.update({
      where: {
        id,
      },
      data: {
        comments: {
          create: {
            userId,
            text,
          },
        },
      },
    });
  }
}
