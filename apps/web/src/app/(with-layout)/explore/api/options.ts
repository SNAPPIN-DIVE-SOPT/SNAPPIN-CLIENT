import { infiniteQueryOptions } from '@tanstack/react-query';
import { GetPortfolioListData, GetProductListData } from '@/swagger-api';
import {
  exploreListInitialPageParam,
  getExploreListNextPageParam,
  getExplorePortfolioListQueryKey,
  getExploreProductListQueryKey,
} from './shared';

type ExploreListQueryOptionsParams<TData> = {
  isLogIn: boolean;
  sp: URLSearchParams;
  queryFn: (cursor?: string) => Promise<TData>;
};

export const explorePortfolioListOptions = ({
  isLogIn,
  sp,
  queryFn,
}: ExploreListQueryOptionsParams<GetPortfolioListData>) =>
  infiniteQueryOptions({
    queryKey: getExplorePortfolioListQueryKey(sp, isLogIn),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    initialPageParam: exploreListInitialPageParam,
    queryFn: ({ pageParam }) => {
      const cursor = typeof pageParam === 'string' ? pageParam : undefined;
      return queryFn(cursor);
    },
    getNextPageParam: getExploreListNextPageParam,
  });

export const exploreProductListOptions = ({
  isLogIn,
  sp,
  queryFn,
}: ExploreListQueryOptionsParams<GetProductListData>) =>
  infiniteQueryOptions({
    queryKey: getExploreProductListQueryKey(sp, isLogIn),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    initialPageParam: exploreListInitialPageParam,
    queryFn: ({ pageParam }) => {
      const cursor = typeof pageParam === 'string' ? pageParam : undefined;
      return queryFn(cursor);
    },
    getNextPageParam: getExploreListNextPageParam,
  });
