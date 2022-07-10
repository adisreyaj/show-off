import { QueryFilter, QueryFilterCombination } from '@show-off/api-interfaces';

export const convertFilterCombinationToPrismaFilters = (
  filterCombinations: QueryFilterCombination
) => {
  return Object.keys(filterCombinations).reduce((acc, key) => {
    return {
      ...acc,
      [key]: convertFiltersToPrismaFilters(filterCombinations[key]),
    };
  }, {});
};

export const convertFiltersToPrismaFilters = (filters: QueryFilter[]) => {
  return (filters ?? []).map((filter) => {
    return {
      [filter.key]: {
        [filter.operator]: filter.value,
      },
    };
  });
};
