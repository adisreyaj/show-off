import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@show-off/db';
import {
  CollectionOrderByType,
  CreateCollectionInput,
  CreateItemData,
  ItemUpdateInput,
  OrderByDirection,
  QueryArgs,
  UpdateCollectionInput,
} from '@show-off/api-interfaces';
import { ItemType, Prisma } from '@prisma/client';
import { convertFilterCombinationToPrismaFilters } from '@show-off/api/shared';

const COLLECTION_INCLUDE: Prisma.CollectionInclude = {
  likes: true,
  items: true,
  comments: {
    include: {
      user: true,
    },
  },
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

  find({
    take = 100,
    skip = 0,
    orderBy = {
      key: CollectionOrderByType.CreatedAt,
      direction: OrderByDirection.Desc,
    },
    filters = null,
  }: QueryArgs) {
    const orderByMapping = {
      [CollectionOrderByType.Comments]: {
        comments: {
          _count: orderBy.direction,
        },
      },
      [CollectionOrderByType.Likes]: {
        likes: {
          _count: orderBy.direction,
        },
      },
      [CollectionOrderByType.CreatedAt]: {
        createdAt: orderBy.direction,
      },
      [CollectionOrderByType.LastUpdated]: {
        updatedAt: orderBy.direction,
      },
    };

    return this.prisma.collection.findMany({
      take,
      skip,
      where: convertFilterCombinationToPrismaFilters(filters),
      orderBy: orderByMapping[orderBy.key],
      include: COLLECTION_INCLUDE,
    });
  }

  async findById(id: string, userId: string) {
    const collection = this.prisma.collection.findUniqueOrThrow({
      where: { id },
      include: COLLECTION_INCLUDE,
    });
    const isLiked = this.prisma.like.findFirst({
      where: {
        userId,
        collectionId: id,
      },
    });
    const [liked, collectionData] = await this.prisma.$transaction([
      isLiked,
      collection,
    ]);
    return {
      ...collectionData,
      liked: !!liked,
    };
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

  async addNewItems(id: string, userId: string, input: CreateItemData[]) {
    await this.collectionOwnerCheck(id, userId);

    return this.prisma.collection.update({
      where: {
        id,
      },
      data: {
        items: {
          create: input.map((item) => ({
            ...item,
            type: item.type as ItemType,
            userId,
            links: (item.links as unknown as Prisma.InputJsonValue) ?? [],
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
    await this.collectionOwnerCheck(id, userId);

    const item = await this.prisma.item.findUnique({
      where: {
        id: itemId,
      },
      select: {
        name: true,
        metadata: true,
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

  comment(id: string, userId: string, comment: string) {
    return this.prisma.collection.update({
      where: {
        id,
      },
      data: {
        comments: {
          create: {
            userId,
            text: comment,
          },
        },
      },
    });
  }

  async update(id: string, userId: string, data: UpdateCollectionInput) {
    await this.collectionOwnerCheck(id, userId);
    return this.prisma.collection.update({
      where: {
        id,
      },
      data,
    });
  }

  async updateItem(id: string, userId: string, input: ItemUpdateInput) {
    await this.itemOwnerCheck(id, userId);
    return this.prisma.item.update({
      where: {
        id,
      },
      data: {
        ...input,
        links: (input.links as unknown as Prisma.InputJsonValue) ?? [],
      },
    });
  }

  async deleteItem(id: string, userId: string) {
    await this.itemOwnerCheck(id, userId);
    await this.prisma.item.delete({
      where: {
        id,
      },
    });
    return {
      success: true,
    };
  }

  async itemOwnerCheck(id: string, userTryingToAccess: string) {
    const item = await this.prisma.item.findUniqueOrThrow({
      where: { id },
      select: {
        userId: true,
      },
    });
    if (item.userId !== userTryingToAccess) {
      throw new ForbiddenException();
    }
  }

  async collectionOwnerCheck(id: string, userTryingToAccess: string) {
    const item = await this.prisma.collection.findUniqueOrThrow({
      where: { id },
      select: {
        userId: true,
      },
    });
    if (item.userId !== userTryingToAccess) {
      throw new ForbiddenException();
    }
  }
}
