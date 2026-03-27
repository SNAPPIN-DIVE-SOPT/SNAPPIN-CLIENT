'use client';

import { EXPLORE_SCROLL_TARGET_ID, ExploreTab } from '../../constants/tab';
import { useExploreOptionVisibility } from '../../hooks/useExploreOptionVisibility';
import ExploreSearchButton from './ExploreSearchButton';
import OptionSection from '@/app/(with-layout)/explore/_section/OptionSection';

type ExploreHeaderProps = {
  currentTab: ExploreTab;
  headline: string;
  supportingText: string;
  searchSheetKey: string;
  portfolioTabHref: string;
  productTabHref: string;
};

export default function ExploreHeader({
  currentTab,
  headline,
  supportingText,
  searchSheetKey,
  portfolioTabHref,
  productTabHref,
}: ExploreHeaderProps) {
  const scrollTargetId = EXPLORE_SCROLL_TARGET_ID[currentTab];
  const { isVisible } = useExploreOptionVisibility(scrollTargetId);

  return (
    <header className='bg-black-1'>
      <div className='px-[2rem] py-[1.6rem]'>
        <ExploreSearchButton
          headline={headline}
          supportingText={supportingText}
          searchSheetKey={searchSheetKey}
          supportingTextClassName='text-black-7'
        />
      </div>
      <OptionSection
        currentTab={currentTab}
        portfolioTabHref={portfolioTabHref}
        productTabHref={productTabHref}
        isVisible={isVisible}
      />
    </header>
  );
}
