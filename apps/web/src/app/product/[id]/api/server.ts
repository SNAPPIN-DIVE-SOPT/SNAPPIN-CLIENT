import 'server-only';

import { QueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest.server';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { PORTFOLIO_QUERY_KEY, PRODUCT_QUERY_KEY } from '@/query-key/user';
import { GetPortfolioListData, GetProductDetailData } from '@/swagger-api';
import { productReviewsOptions } from '@/app/product/[id]/api/options';

const getProductDetailServer = async (id: number, isLogIn: boolean) => {
  if (isLogIn) {
    const res = await apiRequest<GetProductDetailData>({
      endPoint: `/api/v2/products/${id}`,
      method: 'GET',
    });

    if (!res.data) {
      throw new Error('/api/v2/products/{id} 응답에 데이터가 존재하지 않습니다.');
    }

    return res.data;
  }

  const res = await fetch(`${SERVER_API_BASE_URL}/api/v2/products/${id}`, { method: 'GET' });

  if (!res.ok) {
    throw new Error('상품 상세 정보 및 상품 안내 정보를 불러오는 데 실패했습니다.');
  }

  const data = await res.json();
  return data.data;
};

const getProductPortfoliosServer = async (
  id: number,
  isLogIn: boolean,
  cursor?: string,
) => {
  if (isLogIn) {
    const params: Record<string, string> = { productId: String(id) };

    if (cursor) {
      params.cursor = cursor;
    }

    const res = await apiRequest<GetPortfolioListData>({
      endPoint: '/api/v2/portfolios',
      method: 'GET',
      params,
    });

    if (!res.data) {
      throw new Error('/api/v2/portfolios 응답에 데이터가 존재하지 않습니다.');
    }

    return res;
  }

  const url = new URL(`${SERVER_API_BASE_URL}/api/v2/portfolios`);
  url.searchParams.append('productId', String(id));

  if (cursor) {
    url.searchParams.append('cursor', cursor);
  }

  const res = await fetch(url.toString(), { method: 'GET' });

  if (!res.ok) {
    throw new Error('/api/v2/portfolios 응답에 데이터가 존재하지 않습니다.');
  }

  return await res.json();
};

// 상품 상세 정보 및 상품 안내 조회 prefetch
export const prefetchProductDetail = async (
  queryClient: QueryClient,
  id: number,
  isLogIn: boolean,
) => {
  return queryClient.prefetchQuery({
    queryKey: PRODUCT_QUERY_KEY.DETAIL(id, isLogIn),
    queryFn: () => getProductDetailServer(id, isLogIn),
  });
};

// 포폴 목록 조회 prefetch
export const prefetchPortfolioList = async (
  queryClient: QueryClient,
  id: number,
  isLogIn: boolean
) => {
  return queryClient.prefetchInfiniteQuery({
    queryKey: PORTFOLIO_QUERY_KEY.PRODUCT_LIST(id, isLogIn),
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) => {
      const cursor = typeof pageParam === 'string' ? pageParam : undefined;
      return getProductPortfoliosServer(id, isLogIn, cursor);
    },
    getNextPageParam: (lastPage) => (lastPage.meta?.hasNext ? lastPage.meta.nextCursor : undefined),
    pages: 1,
  });
};

// 상품 리뷰 목록 조회 prefetch
export const prefetchProductReviewList = async (queryClient: QueryClient, id: number) => {
  return queryClient.prefetchInfiniteQuery({
    ...productReviewsOptions(id),
    pages: 1,
  });
};
