export const EXPLORE_SORT = {
  RECOMMENDED: 'RECOMMENDED',
  POPULAR: 'POPULAR',
  LATEST: 'LATEST',
} as const;

export type ExploreSort = (typeof EXPLORE_SORT)[keyof typeof EXPLORE_SORT];

export const EXPLORE_SORT_LABEL: Record<ExploreSort, string> = {
  [EXPLORE_SORT.RECOMMENDED]: '추천순',
  [EXPLORE_SORT.POPULAR]: '인기순',
  [EXPLORE_SORT.LATEST]: '최신순',
} as const;

export const EXPLORE_SORT_OPTIONS = [
  EXPLORE_SORT.RECOMMENDED,
  EXPLORE_SORT.POPULAR,
  EXPLORE_SORT.LATEST,
] as const;
