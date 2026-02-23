import ExploreHeader from '@/app/(with-layout)/explore/components/header/ExploreHeader';
import ExploreTabPanels from '@/app/(with-layout)/explore/components/tab-panel/ExploreTabPanels';
import { EXPLORE_TAB } from '@/app/(with-layout)/explore/constants/tab';
import { parseInitialDraft, pickAllowedParams } from '@/app/(with-layout)/explore/utils/query';
import {
  getExploreSearchBarText,
  resolveExploreTab,
} from '@/app/(with-layout)/explore/utils/view-model';

type ExplorePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const toURLSearchParams = (params: Record<string, string | string[] | undefined>) => {
  const sp = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => sp.append(key, v));
      return;
    }
    if (value != null) sp.set(key, value);
  });

  return sp;
};

export default async function Explore({ searchParams }: ExplorePageProps) {
  const resolvedSearchParams = await searchParams;
  const initialSearchParams = toURLSearchParams(resolvedSearchParams);
  const { headline, supportingText } = getExploreSearchBarText(initialSearchParams);
  const initialTab = resolveExploreTab(initialSearchParams.get('tab'));
  const placeName = parseInitialDraft(initialSearchParams).placeName ?? '';
  const searchSheetKey = `search-sheet:${placeName}:${initialSearchParams.toString()}`;

  const getTabHref = (tab: typeof EXPLORE_TAB.PORTFOLIO | typeof EXPLORE_TAB.PRODUCT) => {
    const nextParams = pickAllowedParams(initialSearchParams);
    nextParams.set('tab', tab);
    const query = nextParams.toString();
    return query ? `/explore?${query}` : '/explore';
  };

  return (
    <div className='bg-black-1 flex h-[calc(100dvh-5.6rem)] min-h-0 flex-col overflow-hidden'>
      <ExploreHeader
        currentTab={initialTab}
        headline={headline}
        supportingText={supportingText}
        searchSheetKey={searchSheetKey}
        portfolioTabHref={getTabHref(EXPLORE_TAB.PORTFOLIO)}
        productTabHref={getTabHref(EXPLORE_TAB.PRODUCT)}
      />

      <ExploreTabPanels currentTab={initialTab} />
    </div>
  );
}
