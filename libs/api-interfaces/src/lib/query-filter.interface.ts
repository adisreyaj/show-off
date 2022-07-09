export interface QueryArgs {
  take?: number;
  skip?: number;
  orderBy?: OrderBy;
  filters?: Record<string, string | number | boolean>[];
}

export enum CollectionOrderByType {
  Likes = 'Likes',
  LastUpdated = 'Last Updated',
  CreatedAt = 'Creation Date',
  Comments = 'Comments',
}

export const enum OrderByDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export interface OrderBy {
  key: string;
  direction: OrderByDirection;
}

export interface CollectionOrderBy extends OrderBy {
  key: CollectionOrderByType;
}
