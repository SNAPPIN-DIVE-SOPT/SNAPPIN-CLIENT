import { PORTFOLIO_QUERY_KEY, PRODUCT_QUERY_KEY } from '@/query-key/user';

type ExploreListPageMeta = {
  meta?: {
    hasNext?: boolean;
    nextCursor?: string;
  };
};

export const PORTFOLIO_ENDPOINT = '/api/v2/portfolios';
export const PRODUCT_ENDPOINT = '/api/v2/products';

export const exploreListInitialPageParam = undefined as string | undefined;

export const getExploreListNextPageParam = <TPage extends ExploreListPageMeta>(lastPage: TPage) => {
  return lastPage.meta?.hasNext ? lastPage.meta.nextCursor : undefined;
};

export const buildExploreQuery = (sp: URLSearchParams) => {
  const query = new URLSearchParams();

  const moodIds = sp.get('moodIds');
  if (moodIds) query.set('moodIds', moodIds);

  const minPrice = sp.get('minPrice');
  if (minPrice) query.set('minPrice', minPrice);

  const maxPrice = sp.get('maxPrice');
  if (maxPrice) query.set('maxPrice', maxPrice);

  const photographerId = sp.get('photographerId');
  if (photographerId) query.set('photographerId', photographerId);

  const snapCategory = sp.get('snapCategory');
  if (snapCategory) query.set('snapCategory', snapCategory);

  const placeId = sp.get('placeId');
  if (placeId) query.set('placeId', placeId);

  const date = sp.get('date');
  if (date) query.set('date', date);

  const peopleCount = sp.get('peopleCount');
  if (peopleCount && Number(peopleCount) > 0) query.set('peopleCount', peopleCount);

  return query;
};

export const buildExploreListQuery = (sp: URLSearchParams) => {
  const query = buildExploreQuery(sp);
  const sort = sp.get('sort');

  query.set('snapCategory', 'GRADUATION');

  if (sort) query.set('sort', sort);

  return query;
};

export const toRequestParams = (query: URLSearchParams) => {
  return Object.fromEntries(query.entries());
};

export const getExploreListQueryKey = (sp: URLSearchParams, isLogIn: boolean) => {
  const baseQuery = buildExploreListQuery(sp);

  return `${baseQuery.toString()}-${isLogIn ? 'login' : 'guest'}`;
};

export const getExplorePortfolioListQueryKey = (sp: URLSearchParams, isLogIn: boolean) => {
  return PORTFOLIO_QUERY_KEY.LIST(getExploreListQueryKey(sp, isLogIn));
};

export const getExploreProductListQueryKey = (sp: URLSearchParams, isLogIn: boolean) => {
  return PRODUCT_QUERY_KEY.LIST(getExploreListQueryKey(sp, isLogIn));
};
