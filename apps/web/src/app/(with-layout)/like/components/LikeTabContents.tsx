import { Suspense } from 'react';
import { PortfolioFrameListSkeleton, ProductFrameListSkeleton } from '@/ui';
import { LIKE_TAB, LikeTab } from '@/app/(with-layout)/like/constants/tab';
import PortfolioListSection from '@/app/(with-layout)/like/_section/PortfolioListSection';
import ProductListSection from '@/app/(with-layout)/like/_section/ProductListSection';

type LikeTabContentsProps = {
  currentTab: LikeTab;
};

export default function LikeTabContents({ currentTab }: LikeTabContentsProps) {
  return (
    <div className='scrollbar-hide bg-black-1 min-h-0 overflow-y-hidden'>
      {currentTab === LIKE_TAB.PORTFOLIO && (
        <section className='min-h-full'>
          <Suspense fallback={<PortfolioFrameListSkeleton />}>
            <PortfolioListSection />
          </Suspense>
        </section>
      )}
      {currentTab === LIKE_TAB.PRODUCT && (
        <section className='bg-black-1 min-h-full'>
          <Suspense fallback={<ProductFrameListSkeleton />}>
            <ProductListSection />
          </Suspense>
        </section>
      )}
    </div>
  );
}
