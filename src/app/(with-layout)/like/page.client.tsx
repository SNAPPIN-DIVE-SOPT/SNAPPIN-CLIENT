'use client';

import { Suspense, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PortfolioListSkeleton, ProductListSkeleton, SectionTabs } from '@/ui';
import { LIKE_TAB, LIKE_TAB_MAP } from '@/app/(with-layout)/like/constants/tab';
import PortfolioListSection from '@/app/(with-layout)/like/_section/PortfolioListSection';
import ProductListSection from '@/app/(with-layout)/like/_section/ProductListSection';
import Header from '@/app/(with-layout)/like/component/header/Header';
import LikeEmpty from '@/app/(with-layout)/like/component/empty/LikeEmpty';
import { useLoginToastGuard } from '@/hooks/useLoginToastGuard';

const isLikeTab = (value: string | null) => {
  return value === LIKE_TAB.PORTFOLIO || value === LIKE_TAB.PRODUCT;
};

export default function PageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoggedIn, authResolved } = useLoginToastGuard({
    message: '좋아요 기능은 로그인 후에 사용할 수 있어요.',
  });

  const currentTab = useMemo(() => {
    const raw = searchParams.get('tab');
    return isLikeTab(raw) ? raw : LIKE_TAB.PORTFOLIO;
  }, [searchParams]);

  const handleTabChange = (nextTab: string) => {
    if (!isLikeTab(nextTab)) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', nextTab);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (!authResolved) return null;

  return (
    <SectionTabs value={currentTab} handleValueChange={handleTabChange} className='h-full min-h-0'>
      <div className='bg-black-1 sticky top-0 z-10 shrink-0'>
        <Header />
        <SectionTabs.List>
          <SectionTabs.Tab value={LIKE_TAB.PORTFOLIO}>
            {LIKE_TAB_MAP[LIKE_TAB.PORTFOLIO]}
          </SectionTabs.Tab>
          <SectionTabs.Tab value={LIKE_TAB.PRODUCT}>
            {LIKE_TAB_MAP[LIKE_TAB.PRODUCT]}
          </SectionTabs.Tab>
        </SectionTabs.List>
      </div>
      {!isLoggedIn ? (
        <LikeEmpty tab={currentTab} />
      ) : (
        <main className='scrollbar-hide min-h-0 overflow-y-hidden'>
          <SectionTabs.Contents value={LIKE_TAB.PORTFOLIO} className='min-h-full'>
            {/* 포트폴리오 목록 */}
            <Suspense fallback={<PortfolioListSkeleton className='p-[1rem]' />}>
              <PortfolioListSection />
            </Suspense>
          </SectionTabs.Contents>

          <SectionTabs.Contents value={LIKE_TAB.PRODUCT} className='bg-black-3 min-h-full'>
            {/* 상품 목록 */}
            <Suspense
              fallback={
                <div className='bg-black-3 flex h-full flex-col gap-[0.6rem]'>
                  <ProductListSkeleton length={5} />
                </div>
              }
            >
              <ProductListSection />
            </Suspense>
          </SectionTabs.Contents>
        </main>
      )}
    </SectionTabs>
  );
}
