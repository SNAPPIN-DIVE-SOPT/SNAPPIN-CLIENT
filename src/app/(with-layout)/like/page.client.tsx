'use client';

import { Suspense, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PortfolioListSkeleton, ProductCardSkeleton, SectionTabs } from '@/ui';
import { LIKE_TAB, LIKE_TAB_MAP } from '@/app/(with-layout)/like/constants/tab';
import PortfolioListSection from '@/app/(with-layout)/like/_section/PortfolioListSection';
import ProductListSection from '@/app/(with-layout)/like/_section/ProductListSection';
import { useAuth } from '@/auth/hooks/useAuth';
import { useToast } from '@/ui/toast/hooks/useToast';
import Header from '@/app/(with-layout)/like/component/header/Header';
import LikeEmpty from '@/app/(with-layout)/like/component/empty/LikeEmpty';

const isLikeTab = (value: string | null) => {
  return value === LIKE_TAB.PORTFOLIO || value === LIKE_TAB.PRODUCT;
};

export default function PageClient() {
  const { isLogIn } = useAuth();
  const { login } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

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

  useEffect(() => {
    if (isLogIn === false) {
      login('좋아요 기능은 로그인 후에 사용할 수 있어요.', undefined, 'bottom-[8.6rem]');
    }
  }, [isLogIn, login]);

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
      {isLogIn !== null && !isLogIn ? (
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
                <div className='bg-black-1 px-[2rem] py-[1.6rem]'>
                  <ProductCardSkeleton />
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
