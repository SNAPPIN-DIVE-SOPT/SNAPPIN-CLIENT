'use client';

import { ButtonSearchBar, SectionTabs } from '@/ui';
import { useMemo } from 'react';
import PortfolioListSection from '@/app/(with-layout)/explore/_section/PortfolioListSection';
import ProductListSection from '@/app/(with-layout)/explore/_section/ProductListSection';
import ExploreFilter from '@/app/(with-layout)/explore/components/filter/ExploreFilter';
import ExploreSearchDrawer from '@/app/(with-layout)/explore/components/search-drawer/ExploreSearchDrawer';
import { MOOD_LIST } from '@/app/(with-layout)/explore/mocks/filter';
import { overlay } from 'overlay-kit';
import { EXPLORE_TAB, EXPLORE_TAB_MAP } from '@/app/(with-layout)/explore/constants/tab';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const isExploreTab = (value: string | null) => {
  return value === EXPLORE_TAB.PORTFOLIO || value === EXPLORE_TAB.PRODUCT;
};

export default function PageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTab = useMemo(() => {
    const raw = searchParams.get('tab');
    return isExploreTab(raw) ? raw : EXPLORE_TAB.PORTFOLIO;
  }, [searchParams]);

  const handleTabChange = (nextTab: string) => {
    if (!isExploreTab(nextTab)) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', nextTab);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleDrawerOpen = () => {
    overlay.open(({ isOpen, close }) => <ExploreSearchDrawer isOpen={isOpen} onClose={close} />);
  };

  return (
    <SectionTabs
      value={currentTab}
      handleValueChange={handleTabChange}
      className='bg-black-1 flex min-h-0 flex-col'
    >
      {/* 탐색 페이지 상단 고정 영역 헤더 */}
      <header className='border-black-3 bg-black-1 sticky top-0 z-100 shrink-0 border-b-[0.1rem]'>
        {/* 검색 버튼 */}
        <div className='px-[2rem] py-[1.6rem]'>
          <ButtonSearchBar
            headline='어떤 스냅 작가를 찾고 있나요?'
            supportingText='날짜, 스냅 종류, 지역 기반으로 정교한 검색'
            onClick={handleDrawerOpen}
          />
        </div>

        {/* 탐색 탭 */}
        <SectionTabs.List>
          <SectionTabs.Tab value={EXPLORE_TAB.PORTFOLIO}>
            {EXPLORE_TAB_MAP[EXPLORE_TAB.PORTFOLIO]}
          </SectionTabs.Tab>
          <SectionTabs.Tab value={EXPLORE_TAB.PRODUCT}>
            {EXPLORE_TAB_MAP[EXPLORE_TAB.PRODUCT]}
          </SectionTabs.Tab>
        </SectionTabs.List>

        {/* 필터 */}
        <ExploreFilter moodList={MOOD_LIST} />
      </header>

      {/* 탐색 페이지 탭 메인 콘텐츠 영역 */}
      <main className='scrollbar-hide min-h-0 overflow-y-hidden'>
        <SectionTabs.Contents value={EXPLORE_TAB.PORTFOLIO} className='min-h-full'>
          {/* 포트폴리오 목록 */}
          <PortfolioListSection />
        </SectionTabs.Contents>

        <SectionTabs.Contents value={EXPLORE_TAB.PRODUCT} className='min-h-full'>
          {/* 상품 목록 */}
          <ProductListSection />
        </SectionTabs.Contents>
      </main>
    </SectionTabs>
  );
}
