'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SectionTabs } from '@/ui';
import {
  PhotographerSection,
  PhotographerSectionSkeleton,
  PortfolioListSection,
  ProductListSection,
} from './_section/index';
import Footer from './components/footer/Footer';
import { PHOTOGRAPHER_TAB, PHOTOGRAPHER_TAB_MAP } from './constants/tab';
import { useGetPhotographerDetail } from './api/index';
import { ROUTES } from '@/constants/routes/routes';
import DetailHeader from '@/components/layout/detail/DetailHeader';

type ClientPageProps = {
  id: string;
};

export default function ClientPage({ id }: ClientPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [selectedTab, setSelectedTab] = useState(tabParam ?? PHOTOGRAPHER_TAB.PORTFOLIO);

  const { data, isPending } = useGetPhotographerDetail(Number(id));

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    router.replace(ROUTES.PHOTOGRAPHER(Number(id), { tab: value }), { scroll: false });
  };

  return (
    <main className='flex flex-col'>
      <DetailHeader>작가 상세</DetailHeader>
      {isPending ? (
        <PhotographerSectionSkeleton />
      ) : (
        <PhotographerSection
          name={data?.name ?? ''}
          imageUrl={data?.profileImageUrl ?? ''}
          bio={data?.bio ?? ''}
          specialties={data?.specialties ?? []}
          locations={data?.locations ?? []}
        />
      )}
      <SectionTabs value={selectedTab} handleValueChange={handleTabChange}>
        {/* 탭 영역 */}
        <SectionTabs.List className='bg-black-1 fixed top-[17.6rem] z-10 w-full max-w-[45rem] px-[2rem]'>
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
          className='bg-black-1 mb-[7.6rem] p-[1rem]'
        >
          <PortfolioListSection id={id} />
        </SectionTabs.Contents>
        {/* 상품 목록 */}
        <SectionTabs.Contents value={PHOTOGRAPHER_TAB.PRODUCT} className='mb-[7.6rem]'>
          <ProductListSection id={id} />
        </SectionTabs.Contents>
      </SectionTabs>
      <Footer />
    </main>
  );
}
