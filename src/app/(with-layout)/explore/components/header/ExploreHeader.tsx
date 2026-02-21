import { Tabs } from '@/ui';
import ExploreFilter from '@/app/(with-layout)/explore/components/filter/ExploreFilter';
import { EXPLORE_TAB, EXPLORE_TAB_MAP } from '@/app/(with-layout)/explore/constants/tab';
import ExploreSearchButton from '@/app/(with-layout)/explore/components/header/ExploreSearchButton';

const TABS = [{ value: EXPLORE_TAB.PORTFOLIO }, { value: EXPLORE_TAB.PRODUCT }];

type ExploreHeaderProps = {
  currentTab: typeof EXPLORE_TAB.PORTFOLIO | typeof EXPLORE_TAB.PRODUCT;
  headline: string;
  supportingText: string;
  searchSheetKey: string;
  portfolioTabHref: string;
  productTabHref: string;
};

function ExploreHeader({
  currentTab,
  headline,
  supportingText,
  searchSheetKey,
  portfolioTabHref,
  productTabHref,
}: ExploreHeaderProps) {
  return (
    <header className='border-black-3 bg-black-1 sticky top-0 z-100 shrink-0 border-b-[0.1rem]'>
      <div className='px-[2rem] py-[1.6rem]'>
        <ExploreSearchButton
          headline={headline}
          supportingText={supportingText}
          searchSheetKey={searchSheetKey}
          supportingTextClassName='text-black-7'
        />
      </div>

      <Tabs.List activeValue={currentTab} tabs={TABS}>
        <Tabs.Item value={EXPLORE_TAB.PORTFOLIO} activeValue={currentTab} href={portfolioTabHref}>
          {EXPLORE_TAB_MAP[EXPLORE_TAB.PORTFOLIO]}
        </Tabs.Item>
        <Tabs.Item value={EXPLORE_TAB.PRODUCT} activeValue={currentTab} href={productTabHref}>
          {EXPLORE_TAB_MAP[EXPLORE_TAB.PRODUCT]}
        </Tabs.Item>
      </Tabs.List>

      <ExploreFilter />
    </header>
  );
}

export default ExploreHeader;
