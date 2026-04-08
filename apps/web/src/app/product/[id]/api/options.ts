import { queryOptions, infiniteQueryOptions } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import { USER_QUERY_KEY } from '@/query-key/user';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { GetPortfolioListData, GetProductDetailData } from '@/swagger-api';

// 상품 상세 정보 및 상품 안내 조회 옵션
// TODO: 서버 변경 후 v1 -> v2
export const productDetailOptions = (id: number, isLogIn: boolean) =>
  queryOptions({
    queryKey: USER_QUERY_KEY.PRODUCT_DETAIL(id, isLogIn),
    queryFn: async () => {
      if (isLogIn) {
        const res = await apiRequest<GetProductDetailData>({
          endPoint: `/api/v1/products/${id}`,
          method: 'GET',
        });

        if (!res.data) {
          throw new Error('/api/v1/products/{id} 응답에 데이터가 존재하지 않습니다.');
        }
        return res.data;
      }

      const res = await fetch(`${SERVER_API_BASE_URL}/api/v1/products/${id}`, { method: 'GET' });

      if (!res.ok) {
        throw new Error('상품 상세 정보 및 상품 안내 정보를 불러오는 데 실패했습니다.');
      }

      const data = await res.json();
      return data.data;
    },
  });

// 포폴 목록 조회 옵션
export const productPortfoliosOptions = (id: number, isLogIn: boolean) =>
  infiniteQueryOptions({
    queryKey: USER_QUERY_KEY.PRODUCT_PORTFOLIOS(id, isLogIn),
    initialPageParam: undefined as string | undefined,
    queryFn: async ({ pageParam }) => {
      const url = new URL(`${SERVER_API_BASE_URL}/api/v2/portfolios`);
      url.searchParams.append('productId', String(id));
      if (pageParam) {
        url.searchParams.append('cursor', String(pageParam));
      }

      if (isLogIn) {
        const res = await apiRequest<GetPortfolioListData>({
          endPoint: `/api/v2/portfolios?${url.searchParams}`,
          method: 'GET',
        });

        if (!res?.data) {
          throw new Error('/api/v2/portfolios 응답에 데이터가 존재하지 않습니다.');
        }
        return res;
      }

      const res = await fetch(url.toString(), { method: 'GET' });

      if (!res.ok) {
        throw new Error('/api/v2/portfolios 응답에 데이터가 존재하지 않습니다.');
      }

      return await res.json();
    },
    getNextPageParam: (lastPage) => (lastPage.meta?.hasNext ? lastPage.meta.nextCursor : undefined),
  });

// 상품 리뷰 목록 조회 옵션
export const productReviewsOptions = (id: number) =>
  infiniteQueryOptions({
    queryKey: USER_QUERY_KEY.PRODUCT_REVIEWS(id),
    initialPageParam: undefined,
    queryFn: async ({ pageParam }) => {
      const url = new URL(`${SERVER_API_BASE_URL}/api/v1/products/${id}/reviews`);
      if (pageParam) {
        url.searchParams.append('cursor', String(pageParam));
      }

      const res = await fetch(url.toString(), { method: 'GET' });

      if (!res.ok) {
        throw new Error('/api/v1/products/{productId}/reviews 응답에 데이터가 존재하지 않습니다.');
      }

      return await res.json();
    },
    getNextPageParam: (lastPage) => (lastPage.meta?.hasNext ? lastPage.meta.nextCursor : undefined),
  });
