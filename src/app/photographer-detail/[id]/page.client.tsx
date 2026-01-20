'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SectionTabs } from '@/ui';
import { PhotographerSection, PhotographerSectionSkeleton, PortfolioListSection, ProductListSection } from './_section/index';
import { Header, Footer } from './components/index';
import { PHOTOGRAPHER_TAB, PHOTOGRAPHER_TAB_MAP } from './constants/tab';
import { useGetPhotographerDetail } from './api/index';

type ClientPageProps = {
  id: string;
}

export default function ClientPage({ id }: ClientPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [selectedTab, setSelectedTab] = useState(tabParam ?? PHOTOGRAPHER_TAB.PORTFOLIO);

  const { data, isPending } = useGetPhotographerDetail(Number(id));

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    router.replace(`?tab=${value}`, { scroll: false });
  }

  return (
    <div className='flex flex-col'>
      <Header />
      {isPending
        ? <PhotographerSectionSkeleton />
        : <PhotographerSection
            name={data?.name ?? ''}
            bio={data?.bio ?? ''}
            specialties={data?.specialties ?? []}
            locations={data?.locations ?? []}
          />
      }
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
          <PortfolioListSection id={Number(id)} />
        </SectionTabs.Contents>
        {/* 상품 목록 */}
        <SectionTabs.Contents
          value={PHOTOGRAPHER_TAB.PRODUCT}
          className='mb-[7.6rem]'
        >
          <ProductListSection id={Number(id)} />
        </SectionTabs.Contents>
      </SectionTabs>
      <Footer />
    </div>
  );
}