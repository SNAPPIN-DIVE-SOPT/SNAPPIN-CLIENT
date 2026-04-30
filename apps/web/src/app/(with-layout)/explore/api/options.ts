import { infiniteQueryOptions, type QueryKey } from '@tanstack/react-query';
import { GetPortfolioListData, GetProductListData } from '@/swagger-api';
import {
  exploreListInitialPageParam,
  getExploreListNextPageParam,
  getExplorePortfolioListQueryKey,
  getExploreProductListQueryKey,
} from '@/app/(with-layout)/explore/api/shared';


type ExploreListData = {
  meta?: {
    hasNext?: boolean;
    nextCursor?: string;
  };
};

type ExploreListQueryOptionsParams<TData extends ExploreListData> = {
  isLogIn: boolean;
  sp: URLSearchParams;
  queryFn: (cursor?: string) => Promise<TData>;
};

type CreateExploreListOptionsParams<TData extends ExploreListData> = {
  queryKey: QueryKey;
  queryFn: (cursor?: string) => Promise<TData>;
};

const createExploreListOptions = <TData extends ExploreListData>({
  queryKey,
  queryFn,
}: CreateExploreListOptionsParams<TData>) =>
  infiniteQueryOptions({
    queryKey,
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

export const explorePortfolioListOptions = ({
  isLogIn,
  sp,
  queryFn,
}: ExploreListQueryOptionsParams<GetPortfolioListData>) =>
  createExploreListOptions({
    queryKey: getExplorePortfolioListQueryKey(sp, isLogIn),
    queryFn,
  });

export const exploreProductListOptions = ({
  isLogIn,
  sp,
  queryFn,
}: ExploreListQueryOptionsParams<GetProductListData>) =>
  createExploreListOptions({
    queryKey: getExploreProductListQueryKey(sp, isLogIn),
    queryFn,
  });
