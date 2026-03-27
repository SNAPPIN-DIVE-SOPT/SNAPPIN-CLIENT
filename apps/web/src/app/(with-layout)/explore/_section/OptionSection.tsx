'use client';

import {
  EXPLORE_TAB,
  EXPLORE_TAB_MAP,
  ExploreTab,
} from '@/app/(with-layout)/explore/constants/tab';
import ExploreFilter from '@/app/(with-layout)/explore/components/filter/ExploreFilter';
import { Tabs } from '@snappin/design-system';
import { cn } from '@snappin/design-system/lib/cn';
import ExploreResultToolbar from '../components/result-toolbar/ExploreResultToolbar';

const TABS = [{ value: EXPLORE_TAB.PORTFOLIO }, { value: EXPLORE_TAB.PRODUCT }];

type OptionSectionProps = {
  currentTab: ExploreTab;
  portfolioTabHref: string;
  productTabHref: string;
  isVisible?: boolean;
};

export default function OptionSection({
  currentTab,
  portfolioTabHref,
  productTabHref,
  isVisible = true,
}: OptionSectionProps) {
  return (
    <div className='border-black-3 bg-black-1 border-b-[0.1rem]'>
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
      <ExploreResultToolbar />
    </div>
  );
}
