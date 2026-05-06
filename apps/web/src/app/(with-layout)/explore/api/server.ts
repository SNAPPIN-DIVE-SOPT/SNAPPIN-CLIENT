import 'server-only';

import { QueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest.server';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { GetPortfolioListData, GetProductListData } from '@/swagger-api';
import {
  buildExploreListQuery,
  PORTFOLIO_ENDPOINT,
  PRODUCT_ENDPOINT,
  toRequestParams,
} from './shared';
import { explorePortfolioListOptions, exploreProductListOptions } from './options';

type ExploreListEndpoint = typeof PORTFOLIO_ENDPOINT | typeof PRODUCT_ENDPOINT;

type ExploreListResponse = {
  data?: unknown;
};

type ExploreListServerParams = {
  sp: URLSearchParams;
  isLogIn: boolean;
  endpoint: ExploreListEndpoint;
  cursor?: string;
};

const buildExploreListUrl = (endpoint: ExploreListEndpoint, query: URLSearchParams) => {
  const url = new URL(`${SERVER_API_BASE_URL}${endpoint}`);

  query.forEach((value, key) => url.searchParams.set(key, value));

  return url;
};

const requestExploreListServer = async <TData extends ExploreListResponse>({
  sp,
  isLogIn,
  endpoint,
  cursor,
}: ExploreListServerParams) => {
  const query = buildExploreListQuery(sp);

  if (cursor) {
    query.set('cursor', cursor);
  }

  if (isLogIn) {
    const response = await apiRequest<TData>({
      endPoint: endpoint,
      method: 'GET',
      params: toRequestParams(query),
    });

    if (!response.data) {
      throw new Error(`${endpoint} response data is missing.`);
    }

    return response;
  }

  const url = buildExploreListUrl(endpoint, query);
  const response = await fetch(url.toString(), { method: 'GET' });

  if (!response.ok) {
    throw new Error(`${endpoint} request failed.`);
  }

  const data = await response.json();

  if (!data?.data) {
    throw new Error(`${endpoint} response data is missing.`);
  }

  return data as TData;
};

const getExplorePortfolioListServer = async (
  sp: URLSearchParams,
  isLogIn: boolean,
  cursor?: string,
) => {
  return requestExploreListServer<GetPortfolioListData>({
    sp,
    isLogIn,
    cursor,
    endpoint: PORTFOLIO_ENDPOINT,
  });
};

const getExploreProductListServer = async (
  sp: URLSearchParams,
  isLogIn: boolean,
  cursor?: string,
) => {
  return requestExploreListServer<GetProductListData>({
    sp,
    isLogIn,
    cursor,
    endpoint: PRODUCT_ENDPOINT,
  });
};

export const prefetchExplorePortfolioList = (
  queryClient: QueryClient,
  sp: URLSearchParams,
  isLogIn: boolean,
) => {
  return queryClient.prefetchInfiniteQuery({
    ...explorePortfolioListOptions({
      sp,
      isLogIn,
      queryFn: (cursor) => getExplorePortfolioListServer(sp, isLogIn, cursor),
    }),
    pages: 1,
  });
};

export const prefetchExploreProductList = (
  queryClient: QueryClient,
  sp: URLSearchParams,
  isLogIn: boolean,
) => {
  return queryClient.prefetchInfiniteQuery({
    ...exploreProductListOptions({
      sp,
      isLogIn,
      queryFn: (cursor) => getExploreProductListServer(sp, isLogIn, cursor),
    }),
    pages: 1,
  });
};
