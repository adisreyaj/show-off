export interface QueryArgs {
  take?: number;
  skip?: number;
  orderBy?: OrderBy;
  filters?: QueryFilterCombination;
}

export type QueryFilterCombination = Partial<
  Record<FilterCombination, QueryFilter[]>
>;

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

type Enumerable<T> = T | Array<T>;

export enum FilterCombination {
  And = 'AND',
  Or = 'OR',
  Not = 'NOT',
}

export class QueryFilter {
  key: string;
  value: Enumerable<string | number | boolean>;
  operator: FilterOperator;

  constructor(
    key: string,
    operator: FilterOperator,
    value: Enumerable<string | number | boolean>
  ) {
    this.key = key;
    this.value = value;
    this.operator = operator;
  }
}

export enum FilterOperator {
  Equals = 'equals',
  Not = 'not',
  In = 'in',
  NotIn = 'notIn',
  LessThan = 'lt',
  LessThanOrEqual = 'lte',
  GreaterThan = 'gt',
  GreaterThanOrEqual = 'gte',
  Contains = 'contains',
  Search = 'search',
  StartsWith = 'startsWith',
  EndsWith = 'endsWith',
}
