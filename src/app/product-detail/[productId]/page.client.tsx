'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SectionTabs } from '@/ui';
import { IconArrowForward } from '@/assets';
import {
  PhotographerSection,
  PortfolioListSection,
  ProductDetailSection,
  ProductMainSection,
  ReviewListSection
} from './_section/index';
import { Footer, Header } from './components/index';
import { PRODUCT_TAB, PRODUCT_TAB_MAP } from './constants/tab';
import { useGetProductDetail } from './api/index';

export default function ClientPage({ productId }: { productId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [selectedTab, setSelectedTab] = useState(tabParam ?? PRODUCT_TAB.PRODUCT_DETAIL);

  const { data, isFetching } = useGetProductDetail(Number(productId));

  const productInfo = {
    snapCategory: data?.productInfo?.snapCategory ?? '-',
    regions: data?.productInfo?.regions ?? [],
    moods: data?.productInfo?.moods ?? [],
    maxPeople: data?.productInfo?.maxPeople ?? '-',
    photographerCount: data?.productInfo?.photographerCount ?? '-',
    durationTime: data?.productInfo?.durationTime ?? '-',
    provideRaw: data?.productInfo?.provideRaw,
    provideOriginalJpg: data?.productInfo?.provideOriginalJpg,
    originalJpgCount: data?.productInfo?.originalJpgCount,
    originalDeliveryTime: data?.productInfo?.originalDeliveryTime,
    provideVideo: data?.productInfo?.provideVideo,
    freeRevisionCount: data?.productInfo?.freeRevisionCount,
    finalCutCount: data?.productInfo?.finalCutCount,
    finalDeliveryTime: data?.productInfo?.finalDeliveryTime,
    description: data?.productInfo?.description,
    processDescription: data?.productInfo?.processDescription,
    equipment: data?.productInfo?.equipment,
    caution: data?.productInfo?.caution,
  };

  const photographerInfo = {
    id: data?.photographerInfo?.id ?? 1,
    name: data?.photographerInfo?.name ?? '',
    bio: data?.photographerInfo?.bio ?? '',
    specialties: data?.photographerInfo?.specialties ?? [],
    locations: data?.photographerInfo?.locations ?? [],
  };

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    router.replace(`?tab=${value}`, { scroll: false });
  }

  return (
    <div>
      <Header />
      {isFetching
        ? <ProductDetailSkeleton selectedTab={selectedTab} />
        : <>
            <ProductMainSection
              id={data?.id ?? 0}
              images={data?.images ?? []}
              title={data?.title ?? ''}
              isLiked={data?.isLiked ?? false}
              averageRate={data?.averageRate ?? 0}
              reviewCount={data?.reviewCount ?? 0}
              price={data?.price ?? 0}
              photographer={data?.photographerInfo?.name ?? ''}
            />
            <PhotographerSection photographerInfo={photographerInfo} />
            <SectionTabs
              value={selectedTab}
              handleValueChange={handleTabChange}
            >
              <SectionTabs.List>
                <SectionTabs.Tab value={PRODUCT_TAB.PRODUCT_DETAIL}>
                  {PRODUCT_TAB_MAP[PRODUCT_TAB.PRODUCT_DETAIL]}
                </SectionTabs.Tab>
                <SectionTabs.Tab value={PRODUCT_TAB.PORTFOLIO}>
                  {PRODUCT_TAB_MAP[PRODUCT_TAB.PORTFOLIO]}
                </SectionTabs.Tab>
                <SectionTabs.Tab value={PRODUCT_TAB.REVIEW}>
                  {PRODUCT_TAB_MAP[PRODUCT_TAB.REVIEW]} ({data?.reviewCount})
                </SectionTabs.Tab>
              </SectionTabs.List>
              {/* 상품 안내 탭 */}
              <SectionTabs.Contents value={PRODUCT_TAB.PRODUCT_DETAIL}>
                <ProductDetailSection productInfo={productInfo} />
              </SectionTabs.Contents>
              {/* 포트폴리오 탭 */}
              <SectionTabs.Contents value={PRODUCT_TAB.PORTFOLIO} className='p-[1rem] mb-[8rem] bg-black-1'>
                <PortfolioListSection productId={productId} />
              </SectionTabs.Contents>
              {/* 리뷰 탭 */}
              <SectionTabs.Contents value={PRODUCT_TAB.REVIEW}>
                <ReviewListSection productId={productId} averageRate={data?.averageRate ?? 0} />
              </SectionTabs.Contents>
            </SectionTabs>
          </>
      }
      <Footer
        productId={productId}
        amount={data?.price ?? 0}
        reservationConstraints={{
          minDurationHours: Number(data?.productInfo?.durationTime ?? 0),
          maxParticipantCount: Number(data?.productInfo?.maxPeople ?? 0)
        }}
      />
    </div>
  );
}

const ProductDetailSkeleton = ({ selectedTab }: { selectedTab: string }) => {
  return (
    <div>
      <div className='w-full aspect-[3/4] bg-black-3' />
      <div className='flex flex-col gap-[0.8rem] w-full px-[2rem] py-[1.6rem]'>
        <div>
          <div className='flex justify-between items-center h-[3rem]'>
            <div className='w-[19rem] h-[2.2rem] bg-black-3 rounded-[0.2rem]' />
            <div className='w-[2.4rem] h-[2.4rem] bg-black-3 rounded-[0.2rem]' />
          </div>
          <div className='flex flex-col items-start gap-[0.4rem]'>
            <div className='w-[9.9rem] h-[1.4rem] bg-black-3 rounded-[0.2rem]' />
            <div className='w-[4.3rem] h-[1.4rem] bg-black-3 rounded-[0.2rem]' />
          </div>
        </div>
        <div className='w-[10.9rem] h-[2.6rem] bg-black-3 rounded-[0.2rem]' />
      </div>
      <div className='px-[2rem] pb-[2rem]'>
        <div className='p-[2rem] pt-[2.2rem] pb-[2.1rem] border-1 border-black-4 rounded-[0.6rem]'>
          <div className='flex gap-[1.2rem] items-center'>
            <div className='relative w-[6.4rem] h-[6.4rem] bg-black-3 rounded-full' />
            <div className='flex flex-col flex-1 gap-[0.8rem]'>
              <div className='flex flex-col gap-[0.4rem]'>
                <div className='w-[3.7rem] h-[1.7rem] bg-black-3 rounded-[0.2rem]'/>
                <div className='w-[9rem] h-[1.2rem] bg-black-3 rounded-[0.2rem]' />
              </div>
              <div className='flex flex-col gap-[0.4rem]'>
                <div className='w-[15.8rem] h-[1.2rem] bg-black-3 rounded-[0.2rem]' />
                <div className='w-[3.7rem] h-[1.2rem] bg-black-3 rounded-[0.2rem]' />
              </div>
            </div>
            <IconArrowForward className='text-black-6' />
          </div>
        </div>
      </div>
      <SectionTabs
        value={selectedTab}
      >
        <SectionTabs.List>
          <SectionTabs.Tab value={PRODUCT_TAB.PRODUCT_DETAIL}>
            {PRODUCT_TAB_MAP[PRODUCT_TAB.PRODUCT_DETAIL]}
          </SectionTabs.Tab>
          <SectionTabs.Tab value={PRODUCT_TAB.PORTFOLIO}>
            {PRODUCT_TAB_MAP[PRODUCT_TAB.PORTFOLIO]}
          </SectionTabs.Tab>
          <SectionTabs.Tab value={PRODUCT_TAB.REVIEW}>
            {PRODUCT_TAB_MAP[PRODUCT_TAB.REVIEW]} (0)
          </SectionTabs.Tab>
        </SectionTabs.List>
        <SectionTabs.Contents value={PRODUCT_TAB.PRODUCT_DETAIL}>
          <div className="flex items-center justify-center py-[4rem]">
            <div className="h-[2.4rem] w-[2.4rem] animate-spin rounded-full border-[3px] border-black-4 border-t-black-1" />
          </div>
        </SectionTabs.Contents>
      </SectionTabs>
    </div>
  );
}