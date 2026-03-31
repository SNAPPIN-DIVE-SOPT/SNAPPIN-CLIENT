import ExploreHeader from './components/header/ExploreHeader';
import ExploreTabPanels from './components/tab-panel/ExploreTabPanels';
import { EXPLORE_TAB } from './constants/tab';
import { parseInitialDraft, toExploreSearchParams } from './utils/query';
import { getExploreSearchBarText, resolveExploreTab } from './utils/view-model';
import { SEARCH_SHEET_KEY } from './constants/storage-key';
import { ROUTES } from '@/constants/routes/routes';

type ExplorePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Explore({ searchParams }: ExplorePageProps) {
  const resolvedSearchParams = await searchParams;
  const initialSearchParams = toExploreSearchParams(resolvedSearchParams);
  const { headline, supportingText } = getExploreSearchBarText(initialSearchParams);
  const initialTab = resolveExploreTab(initialSearchParams.get('tab'));
  const placeName = parseInitialDraft(initialSearchParams).placeName ?? '';
  const searchSheetKey = SEARCH_SHEET_KEY(placeName, initialSearchParams.toString());

  const getTabHref = (tab: typeof EXPLORE_TAB.PORTFOLIO | typeof EXPLORE_TAB.PRODUCT) => {
    const nextParams = toExploreSearchParams(initialSearchParams);
    nextParams.set('tab', tab);
    const query = nextParams.toString();
    return query ? `${ROUTES.EXPLORE()}?${query}` : ROUTES.EXPLORE();
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
