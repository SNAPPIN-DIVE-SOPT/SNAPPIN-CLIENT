import { GetWishedPortfoliosData, GetWishedProductsData } from '@/swagger-api';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import { USER_QUERY_KEY } from '@/query-key/user';

export const useGetLikePortfolios = () => {
  return useSuspenseInfiniteQuery<GetWishedPortfoliosData>({
    queryKey: USER_QUERY_KEY.WISHED_PORTFOLIOS(),
    initialPageParam: undefined as string | undefined,
    queryFn: async ({ pageParam }) => {
      const cursor = typeof pageParam === 'string' ? pageParam : undefined;
      const res = await apiRequest<GetWishedPortfoliosData>({
        endPoint: '/api/v2/wishes/portfolios',
        method: 'GET',
        params: cursor ? { cursor } : undefined,
      });

      if (!res.data) throw new Error('No data from /api/v2/wishes/portfolios');

      return res;
    },
    getNextPageParam: (lastPage: GetWishedPortfoliosData) => {
      const nextCursor = lastPage.meta?.nextCursor;
      return lastPage.meta?.hasNext && nextCursor != null ? String(nextCursor) : undefined;
    },
    staleTime: 0,
  });
};

export const useGetLikeProducts = () => {
  return useSuspenseInfiniteQuery<GetWishedProductsData>({
    queryKey: USER_QUERY_KEY.WISHED_PRODUCTS(),
    initialPageParam: undefined as string | undefined,
    queryFn: async ({ pageParam }) => {
      const cursor = typeof pageParam === 'string' ? pageParam : undefined;
      const res = await apiRequest<GetWishedProductsData>({
        endPoint: '/api/v2/wishes/products',
        method: 'GET',
        params: cursor ? { cursor } : undefined,
      });

      if (!res.data) throw new Error('No data from /api/v2/wishes/products');

      return res;
    },
    getNextPageParam: (lastPage: GetWishedProductsData) => {
      const nextCursor = lastPage.meta?.nextCursor;
      return lastPage.meta?.hasNext && nextCursor != null ? String(nextCursor) : undefined;
    },
    staleTime: 0,
  });
};
