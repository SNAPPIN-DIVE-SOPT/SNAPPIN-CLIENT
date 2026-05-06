import { cookies } from 'next/headers';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { ROUTES } from '@/constants/routes/routes';
import { getQueryClient } from '@/utils/getQueryClient';
import { parseInitialDraft, toExploreSearchParams } from '@/app/(with-layout)/explore/utils/query';
import { SEARCH_SHEET_KEY } from '@/app/(with-layout)/explore/constants/storage-key';
import { EXPLORE_TAB } from '@/app/(with-layout)/explore/constants/tab';
import ExploreHeader from '@/app/(with-layout)/explore/components/header/ExploreHeader';
import ExploreTabPanels from '@/app/(with-layout)/explore/components/tab-panel/ExploreTabPanels';
import {
  prefetchExplorePortfolioList,
  prefetchExploreProductList,
} from '@/app/(with-layout)/explore/api/server';
import {
  getExploreSearchBarText,
  resolveExploreTab,
} from '@/app/(with-layout)/explore/utils/view-model';

type ExplorePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Explore({ searchParams }: ExplorePageProps) {
  const resolvedSearchParams = await searchParams;
  const initialSearchParams = toExploreSearchParams(resolvedSearchParams);
  const initialSearchParamsString = initialSearchParams.toString();
  const { headline, isPlaceholder } = getExploreSearchBarText(initialSearchParams);
  const initialTab = resolveExploreTab(initialSearchParams.get('tab'));
  const placeName = parseInitialDraft(initialSearchParams).placeName ?? '';
  const searchSheetKey = SEARCH_SHEET_KEY(placeName, initialSearchParams.toString());
  const cookieStore = await cookies();
  const isLogIn = cookieStore.has('AccessToken');
  const queryClient = getQueryClient();

  const getTabHref = (tab: typeof EXPLORE_TAB.PORTFOLIO | typeof EXPLORE_TAB.PRODUCT) => {
    const nextParams = toExploreSearchParams(initialSearchParams);
    nextParams.set('tab', tab);
    const query = nextParams.toString();
    return query ? `${ROUTES.EXPLORE()}?${query}` : ROUTES.EXPLORE();
  };

  if (initialTab === EXPLORE_TAB.PORTFOLIO) {
    await prefetchExplorePortfolioList(queryClient, initialSearchParams, isLogIn);
  }

  if (initialTab === EXPLORE_TAB.PRODUCT) {
    await prefetchExploreProductList(queryClient, initialSearchParams, isLogIn);
  }

  return (
    <div className='bg-black-1 flex h-[calc(100dvh-5.6rem)] min-h-0 flex-col overflow-hidden'>
      <ExploreHeader
        currentTab={initialTab}
        headline={headline}
        isPlaceholder={isPlaceholder}
        isLogIn={isLogIn}
        searchSheetKey={searchSheetKey}
        portfolioTabHref={getTabHref(EXPLORE_TAB.PORTFOLIO)}
        productTabHref={getTabHref(EXPLORE_TAB.PRODUCT)}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ExploreTabPanels
          currentTab={initialTab}
          isLogIn={isLogIn}
          searchParams={initialSearchParamsString}
        />
      </HydrationBoundary>
    </div>
  );
}
