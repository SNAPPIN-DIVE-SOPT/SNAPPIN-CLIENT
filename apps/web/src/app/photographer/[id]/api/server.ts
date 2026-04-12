import 'server-only';

import { QueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest.server';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { GetPortfolioListData, GetProductListData } from '@/swagger-api';
import { PORTFOLIO_QUERY_KEY, PRODUCT_QUERY_KEY } from '@/query-key/user';
import {
  getPhotographerListNextPageParam,
  photographerListInitialPageParam,
  photographerDetailOptions,
} from './options';

const createPhotographerListFetcher =
  <TData>(endPoint: string, errorMessage: string) =>
  async (id: number, isLogIn: boolean, cursor?: string) => {
    const params: Record<string, string> = { photographerId: String(id) };

    if (cursor) {
      params.cursor = cursor;
    }

    if (isLogIn) {
      const res = await apiRequest<TData>({
        endPoint,
        method: 'GET',
        params,
      });

      if (!res.data) {
        throw new Error(`${endPoint} 응답에 데이터가 존재하지 않습니다.`);
      }

      return res;
    }

    const url = new URL(`${SERVER_API_BASE_URL}${endPoint}`);

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const res = await fetch(url.toString(), { method: 'GET' });

    if (!res.ok) {
      throw new Error(errorMessage);
    }

    const data = await res.json();

    if (!data?.data) {
      throw new Error(`${endPoint} 응답에 데이터가 존재하지 않습니다.`);
    }

    return data;
  };

const getPhotographerPortfoliosServer = createPhotographerListFetcher<GetPortfolioListData>(
  '/api/v2/portfolios',
  '포트폴리오 목록 정보를 불러오는 데 실패했습니다.',
);

const getPhotographerProductsServer = createPhotographerListFetcher<GetProductListData>(
  '/api/v2/products',
  '상품 목록 정보를 불러오는 데 실패했습니다.',
);

// 작가 상세 조회 prefetch
export const prefetchPhotographerDetail = (queryClient: QueryClient, id: number) => {
  return queryClient.prefetchQuery(photographerDetailOptions(id));
}

// 포폴 목록 조회 prefetch
export const prefetchPortfolioList = (
  queryClient: QueryClient,
  id: number,
  isLogIn: boolean
) => {
  return queryClient.prefetchInfiniteQuery({
    queryKey: PORTFOLIO_QUERY_KEY.PHOTOGRAPHER_LIST(id, isLogIn),
    initialPageParam: photographerListInitialPageParam,
    queryFn: ({ pageParam }) => {
      const cursor = typeof pageParam === 'string' ? pageParam : undefined;
      return getPhotographerPortfoliosServer(id, isLogIn, cursor);
    },
    getNextPageParam: getPhotographerListNextPageParam,
    pages: 1,
  });
}

// 상품 목록 조회 prefetch
export const prefetchProductList = (
  queryClient: QueryClient,
  id: number,
  isLogIn: boolean
) => {
  return queryClient.prefetchInfiniteQuery({
    queryKey: PRODUCT_QUERY_KEY.PHOTOGRAPHER_LIST(id, isLogIn),
    initialPageParam: photographerListInitialPageParam,
    queryFn: ({ pageParam }) => {
      const cursor = typeof pageParam === 'string' ? pageParam : undefined;
      return getPhotographerProductsServer(id, isLogIn, cursor);
    },
    getNextPageParam: getPhotographerListNextPageParam,
    pages: 1,
  });
}
