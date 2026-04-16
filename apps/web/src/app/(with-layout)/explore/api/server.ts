import 'server-only';

import { QueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest.server';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { GetPortfolioListData, GetProductListData } from '@/swagger-api';
import {
  buildExploreListQuery,
  exploreListInitialPageParam,
  getExploreListNextPageParam,
  getExplorePortfolioListQueryKey,
  getExploreProductListQueryKey,
  PORTFOLIO_ENDPOINT,
  PRODUCT_ENDPOINT,
  toRequestParams,
} from './shared';

const getExplorePortfolioListServer = async (
  sp: URLSearchParams,
  isLogIn: boolean,
  cursor?: string,
) => {
  const query = buildExploreListQuery(sp);

  if (cursor) {
    query.set('cursor', cursor);
  }

  if (isLogIn) {
    const response = await apiRequest<GetPortfolioListData>({
      endPoint: PORTFOLIO_ENDPOINT,
      method: 'GET',
      params: toRequestParams(query),
    });

    if (!response.data) {
      throw new Error('/api/v2/portfolios response data is missing.');
    }

    return response;
  }

  const url = new URL(`${SERVER_API_BASE_URL}${PORTFOLIO_ENDPOINT}`);
  query.forEach((value, key) => url.searchParams.set(key, value));

  const response = await fetch(url.toString(), { method: 'GET' });

  if (!response.ok) {
    throw new Error('/api/v2/portfolios request failed.');
  }

  const data = await response.json();

  if (!data?.data) {
    throw new Error('/api/v2/portfolios response data is missing.');
  }

  return data as GetPortfolioListData;
};

const getExploreProductListServer = async (
  sp: URLSearchParams,
  isLogIn: boolean,
  cursor?: string,
) => {
  const query = buildExploreListQuery(sp);

  if (cursor) {
    query.set('cursor', cursor);
  }

  if (isLogIn) {
    const response = await apiRequest<GetProductListData>({
      endPoint: PRODUCT_ENDPOINT,
      method: 'GET',
      params: toRequestParams(query),
    });

    if (!response.data) {
      throw new Error('/api/v2/products response data is missing.');
    }

    return response;
  }

  const url = new URL(`${SERVER_API_BASE_URL}${PRODUCT_ENDPOINT}`);
  query.forEach((value, key) => url.searchParams.set(key, value));

  const response = await fetch(url.toString(), { method: 'GET' });

  if (!response.ok) {
    throw new Error('/api/v2/products request failed.');
  }

  const data = await response.json();

  if (!data?.data) {
    throw new Error('/api/v2/products response data is missing.');
  }

  return data as GetProductListData;
};

export const prefetchExplorePortfolioList = (
  queryClient: QueryClient,
  sp: URLSearchParams,
  isLogIn: boolean,
) => {
  return queryClient.prefetchInfiniteQuery({
    queryKey: getExplorePortfolioListQueryKey(sp, isLogIn),
    initialPageParam: exploreListInitialPageParam,
    queryFn: ({ pageParam }) => {
      const cursor = typeof pageParam === 'string' ? pageParam : undefined;
      return getExplorePortfolioListServer(sp, isLogIn, cursor);
    },
    getNextPageParam: getExploreListNextPageParam,
    pages: 1,
  });
};

export const prefetchExploreProductList = (
  queryClient: QueryClient,
  sp: URLSearchParams,
  isLogIn: boolean,
) => {
  return queryClient.prefetchInfiniteQuery({
    queryKey: getExploreProductListQueryKey(sp, isLogIn),
    initialPageParam: exploreListInitialPageParam,
    queryFn: ({ pageParam }) => {
      const cursor = typeof pageParam === 'string' ? pageParam : undefined;
      return getExploreProductListServer(sp, isLogIn, cursor);
    },
    getNextPageParam: getExploreListNextPageParam,
    pages: 1,
  });
};
