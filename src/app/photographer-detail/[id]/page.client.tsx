'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SectionTabs } from '@/ui';
import { PhotographerSection, PortfolioListSection, ProductListSection } from './_section/index';
import { Header, Footer } from './components/index';
import { PHOTOGRAPHER_DETAIL_MOCK } from './mock/index';
import { PHOTOGRAPHER_TAB, PHOTOGRAPHER_TAB_MAP } from './constants/tab';

type PageClientProps = {
  photographerId: string;
}

export default function PageClient({ photographerId }: PageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [selectedTab, setSelectedTab] = useState(tabParam ?? PHOTOGRAPHER_TAB.PORTFOLIO);

  const [cursor, setCursor] = useState<number | null>(null);

  // TODO: 작가 상세 조회 API 연동 (request에 photographerId, cursor 전달)
  const mock = PHOTOGRAPHER_DETAIL_MOCK;

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    router.replace(`?tab=${value}`, { scroll: false });
  }

  return (
    <div className='flex flex-col'>
      <Header />
      <PhotographerSection
        name={mock.name}
        bio={mock.bio}
        specialties={mock.specialties}
        locations={mock.locations}
      />
      <SectionTabs
        value={selectedTab}
        handleValueChange={handleTabChange}
      >
        {/* 탭 영역 */}
        <SectionTabs.List className='sticky top-[17.8rem] z-10 px-[2rem] bg-black-1'>
          <SectionTabs.Tab value={PHOTOGRAPHER_TAB.PORTFOLIO}>
            {PHOTOGRAPHER_TAB_MAP[PHOTOGRAPHER_TAB.PORTFOLIO]}
          </SectionTabs.Tab>
          <SectionTabs.Tab value={PHOTOGRAPHER_TAB.PRODUCT}>
            {PHOTOGRAPHER_TAB_MAP[PHOTOGRAPHER_TAB.PRODUCT]}
          </SectionTabs.Tab>
        </SectionTabs.List>
        {/* 포트폴리오 목록 */}
        <SectionTabs.Contents
          value={PHOTOGRAPHER_TAB.PORTFOLIO}
          className='p-[1rem] mb-[7.6rem] bg-black-1'
        >
          <PortfolioListSection photographerId={Number(photographerId)} />
        </SectionTabs.Contents>
        {/* 상품 목록 */}
        <SectionTabs.Contents
          value={PHOTOGRAPHER_TAB.PRODUCT}
          className='mb-[7.6rem]'
        >
          <ProductListSection photographerId={Number(photographerId)} />
        </SectionTabs.Contents>
      </SectionTabs>
      <Footer />
    </div>
  );
}