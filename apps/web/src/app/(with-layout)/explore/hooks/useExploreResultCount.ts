'use client';

import { useSyncExternalStore } from 'react';
import { useSearchParams } from 'next/navigation';
import { InfiniteData, QueryKey, useQueryClient } from '@tanstack/react-query';
import { GetPortfolioListData, GetProductListData } from '@/swagger-api';
import { ExploreTab, EXPLORE_TAB } from '@/app/(with-layout)/explore/constants/tab';
import { useAuth } from '@/auth/hooks/useAuth';
import {
  getExplorePortfolioListQueryKey,
  getExploreProductListQueryKey,
} from '@/app/(with-layout)/explore/api';

type ExploreListData = GetPortfolioListData | GetProductListData;

const getResultCount = (
  queryClient: ReturnType<typeof useQueryClient>,
  queryKey: QueryKey,
): number => {
  const cachedData = queryClient.getQueryData<InfiniteData<ExploreListData>>(queryKey);

  return cachedData?.pages[0]?.meta?.totalCount ?? 0;
};

export const useExploreResultCount = (currentTab: ExploreTab) => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const { isLogIn } = useAuth();

  return useSyncExternalStore(
    (onStoreChange) => queryClient.getQueryCache().subscribe(onStoreChange),
    () => {
      if (isLogIn === null) return 0;

      const queryKey =
        currentTab === EXPLORE_TAB.PORTFOLIO
          ? getExplorePortfolioListQueryKey(new URLSearchParams(searchParams.toString()), isLogIn)
          : getExploreProductListQueryKey(new URLSearchParams(searchParams.toString()), isLogIn);

      return getResultCount(queryClient, queryKey);
    },
    () => 0,
  );
};
