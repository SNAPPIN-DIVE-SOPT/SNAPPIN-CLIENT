import { queryOptions, infiniteQueryOptions } from '@tanstack/react-query';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { USER_QUERY_KEY } from '@/query-key/user';
import { PHOTOGRAPHER_MOCK, PORTFOLIO_MOCK, PRODUCT_MOCK } from '../../mocks/mock';

// 작가 상세 조회 옵션
export const photographerDetailOptions = (id: number) =>
  queryOptions({
    queryKey: USER_QUERY_KEY.PHOTOGRAPHER_DETAIL(id),
    queryFn: async () => {
      try {
        const res = await fetch(`${SERVER_API_BASE_URL}/api/v1/photographers/${id}`, { method: 'GET' });

        if (!res.ok) {
          throw new Error('작가 상세 정보를 불러오는 데 실패했습니다.');
        }

        const data = await res.json();

        if (!data?.data) {
          throw new Error('작가 상세 응답 데이터가 비어 있습니다.');
        }

        // TODO: API 구현 완료되면 주석 풀기
        // return data.data;
        return PHOTOGRAPHER_MOCK.data;
      } catch (error) {
        if (error instanceof Error) throw error;
        throw new Error('알 수 없는 에러가 발생했습니다.');
      }
    },
  });

// 포폴 목록 조회 옵션
export const photographerPortfoliosOptions = (id: number) =>
  infiniteQueryOptions({
    queryKey: USER_QUERY_KEY.PHOTOGRAPHER_PORTFOLIOS(id),
    initialPageParam: undefined as number | undefined,
    queryFn: async ({ pageParam }) => {
      try {
        const url = new URL(`${SERVER_API_BASE_URL}/api/v1/portfolios`);
        url.searchParams.append('photographerId', String(id));
        if (pageParam) {
          url.searchParams.append('cursor', String(pageParam));
        }

        const res = await fetch(url.toString(), { method: 'GET' });

        if (!res.ok) {
          throw new Error('포트폴리오 목록 정보를 불러오는 데 실패했습니다.');
        }

        const data = await res.json();

        if (!data?.data) {
          throw new Error('포폴 목록 응답 데이터가 비어 있습니다.');
        }

        // TODO: API 구현 완료되면 주석 풀기
        // return data;
        return PORTFOLIO_MOCK;
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
export const photographerProductsOptions = (id: number) =>
  infiniteQueryOptions({
    queryKey: USER_QUERY_KEY.PHOTOGRAPHER_PRODUCTS(id),
    initialPageParam: undefined as number | undefined,
    queryFn: async ({ pageParam }) => {
      try {
        const url = new URL(`${SERVER_API_BASE_URL}/api/v1/products`);
        url.searchParams.append('photographerId', String(id));
        if (pageParam) {
          url.searchParams.append('cursor', String(pageParam));
        }

        const res = await fetch(url.toString(), { method: 'GET' });

        if (!res.ok) {
          throw new Error('상품 목록 정보를 불러오는 데 실패했습니다.');
        }

        const data = await res.json();

        if (!data?.data) {
          throw new Error('상품 목록 응답 데이터가 비어 있습니다.');
        }

        // TODO: API 구현 완료되면 주석 풀기
        // return data;
        return PRODUCT_MOCK;
      } catch (error) {
        if (error instanceof Error) throw error;
        throw new Error('알 수 없는 에러가 발생했습니다.');
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage.meta?.hasNext ? lastPage.meta.nextCursor : undefined;
    },
  });