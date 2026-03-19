import { Suspense } from 'react';
import { PortfolioListSkeleton, ProductListSkeleton } from '@snappin/design-system';
import PortfolioListSection from '../_section/PortfolioListSection';
import ProductListSection from '../_section/ProductListSection';
import { LIKE_TAB, type LikeTab } from '../constants/tab';

type LikeTabContentsProps = {
  currentTab: LikeTab;
};

export default function LikeTabContents({ currentTab }: LikeTabContentsProps) {
  return (
    <div className='scrollbar-hide min-h-0 overflow-y-hidden'>
      {currentTab === LIKE_TAB.PORTFOLIO && (
        <section className='min-h-full'>
          <Suspense fallback={<PortfolioListSkeleton className='p-[1rem]' />}>
            <PortfolioListSection />
          </Suspense>
        </section>
      )}
      {currentTab === LIKE_TAB.PRODUCT && (
        <section className='bg-black-3 min-h-full'>
          <Suspense
            fallback={
              <div className='bg-black-3 flex h-full flex-col gap-[0.6rem]'>
                <ProductListSkeleton length={5} />
              </div>
            }
          >
            <ProductListSection />
          </Suspense>
        </section>
      )}
    </div>
  );
}
