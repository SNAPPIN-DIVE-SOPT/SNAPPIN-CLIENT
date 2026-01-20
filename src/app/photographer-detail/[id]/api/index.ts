import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { USER_QUERY_KEY } from '@/query-key/user';
import {
  GetPhotographerProfileResponse,
  GetPortfolioListData,
  GetProductListData
} from '@/swagger-api/data-contracts';

// 작가 상세 조회 API
export const useGetPhotographerDetail = (id: number) => {
  return useQuery<GetPhotographerProfileResponse>({
    queryKey: USER_QUERY_KEY.PHOTOGRAPHER_DETAIL(id),
    queryFn: async () => {
      const res = await fetch(`${SERVER_API_BASE_URL}/api/v1/photographers/${id}`, { method: 'GET' });

      if (!res.ok) {
        throw new Error('작가 상세 정보를 불러오는 데 실패했습니다.');
      }
      const data = await res.json();
      return data.data;
    },
    enabled: !Number.isNaN(id),
  })
}

// 포폴 목록 조회 API
export const useGetPortfolioList = (id: number) => {
  return useInfiniteQuery<GetPortfolioListData>({
    queryKey: USER_QUERY_KEY.PHOTOGRAPHER_PORTFOLIOS(id),
    initialPageParam: undefined,
    queryFn: async ({ pageParam }) => {
      const url = new URL(`${SERVER_API_BASE_URL}/api/v1/portfolios`);
      url.searchParams.append('photographerId', String(id));
      if (pageParam) {
        url.searchParams.append('cursor', String(pageParam));
      }

      const res = await fetch(url.toString(), { method: 'GET' });

      if (!res.ok) {
        throw new Error('/api/v1/portfolios 응답에 데이터가 존재하지 않습니다.');
      }
      const data = await res.json();
      return data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.meta?.hasNext ? lastPage.meta.nextCursor : undefined;
    },
    enabled: !Number.isNaN(id),
  });
}

// 상품 목록 조회 API
export const useGetProductList = (id: number) => {
  return useInfiniteQuery<GetProductListData>({
    queryKey: USER_QUERY_KEY.PHOTOGRAPHER_PRODUCTS(id),
    initialPageParam: undefined,
    queryFn: async ({ pageParam }) => {
      const url = new URL(`${SERVER_API_BASE_URL}/api/v1/products`);
      url.searchParams.append('productId', String(id));
      if (pageParam) {
        url.searchParams.append('cursor', String(pageParam));
      }

      const res = await fetch(url.toString(), { method: 'GET' });

      if (!res.ok) {
        throw new Error('/api/v1/products 응답에 데이터가 존재하지 않습니다.')
      }
      const data = await res.json();
      return data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.meta?.hasNext ? lastPage.meta.nextCursor : undefined;
    },
    enabled: !Number.isNaN(id),
  });
}