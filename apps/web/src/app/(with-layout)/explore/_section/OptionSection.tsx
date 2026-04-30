'use client';

import { Tabs } from '@snappin/design-system';
import { cn } from '@snappin/design-system/lib';
import ExploreFilter from '@/app/(with-layout)/explore/components/filter/ExploreFilter';
import { useExploreOptionVisibility } from '@/app/(with-layout)/explore/hooks/useExploreOptionVisibility';
import { ExploreResultToolbar } from '@/app/(with-layout)/explore/components';
import {
  EXPLORE_SCROLL_TARGET_ID,
  EXPLORE_TAB,
  EXPLORE_TAB_MAP,
  ExploreTab,
} from '@/app/(with-layout)/explore/constants/tab';

const TABS = [{ value: EXPLORE_TAB.PORTFOLIO }, { value: EXPLORE_TAB.PRODUCT }];

type OptionSectionProps = {
  currentTab: ExploreTab;
  isLogIn: boolean;
  portfolioTabHref: string;
  productTabHref: string;
};

export default function OptionSection({
  currentTab,
  isLogIn,
  portfolioTabHref,
  productTabHref,
}: OptionSectionProps) {
  const scrollTargetId = EXPLORE_SCROLL_TARGET_ID[currentTab];
  const { isVisible } = useExploreOptionVisibility(scrollTargetId);

  return (
    <div className='bg-black-1'>
      <div
        className={cn(
          'overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out will-change-transform',
          isVisible
            ? 'max-h-[4.8rem] translate-y-0 opacity-100'
            : 'pointer-events-none max-h-0 -translate-y-2 opacity-0',
        )}
        aria-hidden={!isVisible}
      >
        <Tabs.List activeValue={currentTab} tabs={TABS}>
          <Tabs.Item value={EXPLORE_TAB.PORTFOLIO} activeValue={currentTab} href={portfolioTabHref}>
            {EXPLORE_TAB_MAP[EXPLORE_TAB.PORTFOLIO]}
          </Tabs.Item>
          <Tabs.Item value={EXPLORE_TAB.PRODUCT} activeValue={currentTab} href={productTabHref}>
            {EXPLORE_TAB_MAP[EXPLORE_TAB.PRODUCT]}
          </Tabs.Item>
        </Tabs.List>
      </div>
      <ExploreFilter />
      <ExploreResultToolbar currentTab={currentTab} isLogIn={isLogIn} />
    </div>
  );
}
