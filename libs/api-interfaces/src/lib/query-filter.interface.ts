export interface QueryFilter {
  take?: number;
  skip?: number;
  orderBy?: {
    key: string;
    direction: OrderByDirection;
  };
}

export const enum OrderByDirection {
  Asc = 'asc',
  Desc = 'desc',
}
