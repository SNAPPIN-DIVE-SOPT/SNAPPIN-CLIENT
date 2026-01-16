'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SectionTabs } from '@/ui';
import {
  PhotographerSection,
  PortfolioListSection,
  ProductDetailSection,
  ProductMainSection,
  ReviewListSection
} from './_section/index';
import { Footer, Header } from './components/index';
import { PRODUCT_TAB, PRODUCT_TAB_MAP } from './constants/tab';
import { PRODUCT_DETAIL_MOCK } from './mock/index';

export default function ClientPage({ productId }: { productId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [selectedTab, setSelectedTab] = useState(tabParam ?? PRODUCT_TAB.PORTFOLIO);

  // TODO: 상품 상세 정보 및 상품 안내 조회 API 연동 (request에 productId 전달)
  const productDetailMock = PRODUCT_DETAIL_MOCK;

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    router.replace(`?tab=${value}`, { scroll: false });
  }

  return (
    <div>
      <Header />
      <ProductMainSection
        id={productDetailMock.id}
        images={productDetailMock.images}
        title={productDetailMock.title}
        initialIsLiked={productDetailMock.isLiked}
        averageRate={productDetailMock.averageRate}
        reviewCount={productDetailMock.reviewCount}
        price={productDetailMock.price}
        photographer={productDetailMock.photographerInfo.name}
      />
      <PhotographerSection photographerInfo={productDetailMock.photographerInfo} />
      <SectionTabs
        value={selectedTab}
        handleValueChange={handleTabChange}
      >
        <SectionTabs.List className='px-[2rem]'>
          <SectionTabs.Tab value={PRODUCT_TAB.PRODUCT_DETAIL}>
            {PRODUCT_TAB_MAP[PRODUCT_TAB.PRODUCT_DETAIL]}
          </SectionTabs.Tab>
          <SectionTabs.Tab value={PRODUCT_TAB.PORTFOLIO}>
            {PRODUCT_TAB_MAP[PRODUCT_TAB.PORTFOLIO]}
          </SectionTabs.Tab>
          <SectionTabs.Tab value={PRODUCT_TAB.REVIEW}>
            {PRODUCT_TAB_MAP[PRODUCT_TAB.REVIEW]} ({productDetailMock.reviewCount})
          </SectionTabs.Tab>
        </SectionTabs.List>
        {/* 상품 안내 탭 */}
        <SectionTabs.Contents value={PRODUCT_TAB.PRODUCT_DETAIL}>
          <ProductDetailSection productInfo={productDetailMock.productInfo} />
        </SectionTabs.Contents>
        {/* 포트폴리오 탭 */}
        <SectionTabs.Contents value={PRODUCT_TAB.PORTFOLIO} className='p-[1rem] mb-[8rem] bg-black-1'>
          <PortfolioListSection productId={productId} />
        </SectionTabs.Contents>
        {/* 리뷰 탭 */}
        <SectionTabs.Contents value={PRODUCT_TAB.REVIEW}>
          <ReviewListSection productId={productId} averageRate={productDetailMock.averageRate} />
        </SectionTabs.Contents>
      </SectionTabs>
      <Footer
        productId={productId}
        amount={productDetailMock.price}
        reservationConstraints={{
          minDurationHours: Number(productDetailMock.productInfo.durationTime),
          maxParticipantCount: Number(productDetailMock.productInfo.maxPeople)
        }}
      />
    </div>
  );
}