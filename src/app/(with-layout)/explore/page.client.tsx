'use client';

import { ButtonSearchBar, SectionTabs } from '@/ui';
import { useState } from 'react';
import PortfolioListSection from '@/app/(with-layout)/explore/_section/PortfolioListSection';
import ProductListSection from '@/app/(with-layout)/explore/_section/ProductListSection';
import ExploreFilter from '@/app/(with-layout)/explore/coponents/explore-filter/ExploreFilter';
import { MOOD_LIST } from '@/app/(with-layout)/explore/mocks/filter';
import { overlay } from 'overlay-kit';
import ExploreSearchDrawer from '@/app/(with-layout)/explore/coponents/explore-search-drawer/ExploreSearchDrawer';

export default function PageClient() {
  const [currentTab, setCurrentTab] = useState('포트폴리오');

  return (
    <SectionTabs
      value={currentTab}
      handleValueChange={setCurrentTab}
      className='flex h-dvh flex-col overflow-hidden'
    >
      {/* 탐색 페이지 상단 고정 영역 헤더 */}
      <header className='border-black-3 sticky top-0 shrink-0 border-b-[0.1rem]'>
        {/* 검색 버튼 */}
        <div className='px-[2rem] py-[1.6rem]'>
          <ButtonSearchBar
            headline='어떤 스냅 작가를 찾고 있나요?'
            supportingText='날짜, 스냅 종류, 지역 기반으로 정교한 검색'
            onClick={() =>
              overlay.open(({ isOpen, close, unmount }) => (
                <ExploreSearchDrawer isOpen={isOpen} onClose={close} />
              ))
            }
          />
        </div>

        {/* 탐색 탭 */}
        <SectionTabs.List>
          <SectionTabs.Tab value='포트폴리오'>포트폴리오</SectionTabs.Tab>
          <SectionTabs.Tab value='상품'>상품</SectionTabs.Tab>
        </SectionTabs.List>

        {/* 필터 */}
        <ExploreFilter moodList={MOOD_LIST} />
      </header>

      {/* 탐색 페이지 탭 메인 콘텐츠 영역 */}
      <main className='scrollbar-hide flex min-h-0 flex-1 flex-col overflow-y-auto'>
        <SectionTabs.Contents value='포트폴리오'>
          {/* 포트폴리오 목록 */}
          <PortfolioListSection />
        </SectionTabs.Contents>

        <SectionTabs.Contents value='상품' className='bg-black-3 flex flex-1 flex-col'>
          {/* 상품 목록 */}
          <ProductListSection />
        </SectionTabs.Contents>
      </main>
    </SectionTabs>
  );
}
