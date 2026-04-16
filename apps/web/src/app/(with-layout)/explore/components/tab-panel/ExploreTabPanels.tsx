'use client';

import { Suspense } from 'react';
import { PortfolioFrameListSkeleton, ProductFrameListSkeleton } from '@/ui';
import { EXPLORE_TAB, ExploreTab } from '@/app/(with-layout)/explore/constants/tab';
import ExploreDetailBackBoundary from '@/app/(with-layout)/explore/components/tab-panel/ExploreDetailBackBoundary';
import PortfolioListSection from '@/app/(with-layout)/explore/_section/PortfolioListSection';
import ProductListSection from '@/app/(with-layout)/explore/_section/ProductListSection';

type ExploreTabPanelsProps = {
  currentTab: ExploreTab;
  isLogIn: boolean;
  searchParams: string;
};

export default function ExploreTabPanels({
  currentTab,
  isLogIn,
  searchParams,
}: ExploreTabPanelsProps) {
  return (
    <ExploreDetailBackBoundary className='flex min-h-0 flex-1 flex-col overflow-hidden'>
      {currentTab === EXPLORE_TAB.PORTFOLIO && (
        <div
          id='explore-portfolio-scroll'
          className='scrollbar-hide min-h-0 flex-1 overflow-y-auto overscroll-contain'
        >
          <Suspense fallback={<PortfolioFrameListSkeleton />}>
            <PortfolioListSection isLogIn={isLogIn} searchParams={searchParams} />
          </Suspense>
        </div>
      )}

      {currentTab === EXPLORE_TAB.PRODUCT && (
        <div
          id='explore-product-scroll'
          className='scrollbar-hide min-h-0 flex-1 overflow-y-auto overscroll-contain'
        >
          <Suspense fallback={<ProductFrameListSkeleton />}>
            <ProductListSection isLogIn={isLogIn} searchParams={searchParams} />
          </Suspense>
        </div>
      )}
    </ExploreDetailBackBoundary>
  );
}
