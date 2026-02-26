import { QueryClient } from '@tanstack/react-query';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { USER_QUERY_KEY } from '@/query-key/user';
import { getProductDetail} from './index';

export const prefetchProductDetail = (queryClient: QueryClient, id: number, isLogIn: boolean) => {
  return queryClient.prefetchQuery({
    queryKey: USER_QUERY_KEY.PRODUCT_DETAIL(id, isLogIn),
    queryFn: () => getProductDetail(id, isLogIn),
  })
}

export const prefetchPortfolioList = async (queryClient: QueryClient, id: number) => {
  return queryClient.prefetchInfiniteQuery({
    queryKey: USER_QUERY_KEY.PRODUCT_PORTFOLIOS(id),
    initialPageParam: undefined, 
    queryFn: async ({ pageParam }) => {
      const url = new URL(`${SERVER_API_BASE_URL}/api/v1/portfolios`);
      url.searchParams.append('productId', String(id));
      if (pageParam) {
        url.searchParams.append('cursor', String(pageParam));
      }

      const res = await fetch(url.toString(), { method: 'GET' });

      if (!res.ok) {
        throw new Error('/api/v1/portfolios 응답에 데이터가 존재하지 않습니다.');
      }

      return await res.json();
    },
    getNextPageParam: (lastPage) => 
      lastPage.meta?.hasNext ? lastPage.meta.nextCursor : undefined,
    pages: 1,
  });
};

export const prefetchProductReviewList = async (queryClient: QueryClient, id: number) => {
  return queryClient.prefetchInfiniteQuery({
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
    getNextPageParam: (lastPage) => 
      lastPage.meta?.hasNext ? lastPage.meta.nextCursor : undefined,
    pages: 1,
  });
};