import { queryOptions, infiniteQueryOptions } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { GetPortfolioListData, GetProductListData } from '@/swagger-api';
import { USER_QUERY_KEY, PORTFOLIO_QUERY_KEY, PRODUCT_QUERY_KEY } from '@/query-key/user';

// 작가 상세 조회 옵션
export const photographerDetailOptions = (id: number) =>
  queryOptions({
    queryKey: USER_QUERY_KEY.PHOTOGRAPHER_DETAIL(id),
    queryFn: async () => {
      try {
        const res = await fetch(`${SERVER_API_BASE_URL}/api/v2/photographers/${id}`, {
          method: 'GET'
        });

        if (!res.ok) {
          throw new Error('작가 상세 정보를 불러오는 데 실패했습니다.');
        }

        const data = await res.json();

        if (!data?.data) {
          throw new Error('/api/v2/photographers 응답에 데이터가 존재하지 않습니다.');
        }

        return data.data;
      } catch (error) {
        if (error instanceof Error) throw error;
        throw new Error('알 수 없는 에러가 발생했습니다.');
      }
    },
  });

// 포폴 목록 조회 옵션
export const photographerPortfoliosOptions = (id: number, isLogIn: boolean) =>
  infiniteQueryOptions({
    queryKey: PORTFOLIO_QUERY_KEY.PHOTOGRAPHER_LIST(id, isLogIn),
    initialPageParam: undefined as string | undefined,
    queryFn: async ({ pageParam }) => {
      try {
        const url = new URL(`${SERVER_API_BASE_URL}/api/v2/portfolios`);
        url.searchParams.append('photographerId', String(id));
        if (pageParam) {
          url.searchParams.append('cursor', String(pageParam));
        }

        if (isLogIn) {
          const res = await apiRequest<GetPortfolioListData>({
            endPoint: `/api/v2/portfolios?${url.searchParams}`,
            method: 'GET'
          });

          if (!res?.data) {
            throw new Error('/api/v2/portfolios 응답에 데이터가 존재하지 않습니다.');
          }
          return res;
        }

        const res = await fetch(url.toString(), { method: 'GET' });

        if (!res.ok) {
          throw new Error('포트폴리오 목록 정보를 불러오는 데 실패했습니다.');
        }

        const data = await res.json();

        if (!data?.data) {
          throw new Error('/api/v2/portfolios 응답에 데이터가 존재하지 않습니다.');
        }

        return data;
      } catch (error) {
        if (error instanceof Error) throw error;
        throw new Error('알 수 없는 에러가 발생했습니다.');
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage.meta?.hasNext ? lastPage.meta.nextCursor : undefined;
    },
  });

// 상품 목록 조회 옵션
export const photographerProductsOptions = (id: number, isLogIn: boolean) =>
  infiniteQueryOptions({
    queryKey: PRODUCT_QUERY_KEY.PHOTOGRAPHER_LIST(id, isLogIn),
    initialPageParam: undefined as string | undefined,
    queryFn: async ({ pageParam }) => {
      try {
        const url = new URL(`${SERVER_API_BASE_URL}/api/v2/products`);
        url.searchParams.append('photographerId', String(id));
        if (pageParam) {
          url.searchParams.append('cursor', String(pageParam));
        }

        if (isLogIn) {
          const res = await apiRequest<GetProductListData>(
            { endPoint: `/api/v2/products?${url.searchParams}`,
            method: 'GET' }
          );
          
          if (!res?.data) {
            throw new Error('/api/v2/products 응답에 데이터가 존재하지 않습니다.');
          }
          return res;
        }

        const res = await fetch(url.toString(), { method: 'GET' });

        if (!res.ok) {
          throw new Error('상품 목록 정보를 불러오는 데 실패했습니다.');
        }

        const data = await res.json();

        if (!data?.data) {
          throw new Error('/api/v2/products 응답에 데이터가 존재하지 않습니다.');
        }

        return data;
      } catch (error) {
        if (error instanceof Error) throw error;
        throw new Error('알 수 없는 에러가 발생했습니다.');
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage.meta?.hasNext ? lastPage.meta.nextCursor : undefined;
    },
  });