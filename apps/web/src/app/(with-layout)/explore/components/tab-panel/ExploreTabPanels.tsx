'use client';

import { Suspense } from 'react';
import { PortfolioListSkeleton, ProductListSkeleton } from '@snappin/design-system';
import PortfolioListSection from '../../_section/PortfolioListSection';
import ProductListSection from '../../_section/ProductListSection';
import { EXPLORE_TAB, ExploreTab } from '../../constants/tab';
import ExploreDetailBackBoundary from './ExploreDetailBackBoundary';

type ExploreTabPanelsProps = {
  currentTab: ExploreTab;
};

export default function ExploreTabPanels({ currentTab }: ExploreTabPanelsProps) {
  return (
    <ExploreDetailBackBoundary className='flex min-h-0 flex-1 flex-col overflow-hidden'>
      {currentTab === EXPLORE_TAB.PORTFOLIO && (
        <div
          id='explore-portfolio-scroll'
          className='scrollbar-hide min-h-0 flex-1 overflow-y-auto overscroll-contain'
        >
          <Suspense fallback={<PortfolioListSkeleton length={15} className='p-[1rem]' />}>
            <PortfolioListSection />
          </Suspense>
        </div>
      )}

      {currentTab === EXPLORE_TAB.PRODUCT && (
        <div
          id='explore-product-scroll'
          className='scrollbar-hide min-h-0 flex-1 overflow-y-auto overscroll-contain'
        >
          <Suspense
            fallback={
              <ProductListSkeleton
                length={5}
                thickness='small'
                className='bg-black-1 border-b-[0.1rem]'
              />
            }
          >
            <ProductListSection />
          </Suspense>
        </div>
      )}
    </ExploreDetailBackBoundary>
  );
}
