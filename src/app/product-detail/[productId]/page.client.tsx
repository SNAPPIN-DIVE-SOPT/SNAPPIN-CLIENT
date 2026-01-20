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
  ReviewListSection,
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
  };

  return (
    <div>
      <Header />
      {isFetching ? (
        <ProductDetailSkeleton selectedTab={selectedTab} />
      ) : (
        <>
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
          <SectionTabs value={selectedTab} handleValueChange={handleTabChange}>
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
            <SectionTabs.Contents
              value={PRODUCT_TAB.PORTFOLIO}
              className='bg-black-1 mb-[8rem] p-[1rem]'
            >
              <PortfolioListSection productId={productId} />
            </SectionTabs.Contents>
            {/* 리뷰 탭 */}
            <SectionTabs.Contents value={PRODUCT_TAB.REVIEW}>
              <ReviewListSection productId={productId} averageRate={data?.averageRate ?? 0} />
            </SectionTabs.Contents>
          </SectionTabs>
        </>
      )}
      <Footer productId={productId} amount={data?.price ?? 0} />
    </div>
  );
}

const ProductDetailSkeleton = ({ selectedTab }: { selectedTab: string }) => {
  return (
    <div>
      <div className='bg-black-3 aspect-[3/4] w-full' />
      <div className='flex w-full flex-col gap-[0.8rem] px-[2rem] py-[1.6rem]'>
        <div>
          <div className='flex h-[3rem] items-center justify-between'>
            <div className='bg-black-3 h-[2.2rem] w-[19rem] rounded-[0.2rem]' />
            <div className='bg-black-3 h-[2.4rem] w-[2.4rem] rounded-[0.2rem]' />
          </div>
          <div className='flex flex-col items-start gap-[0.4rem]'>
            <div className='bg-black-3 h-[1.4rem] w-[9.9rem] rounded-[0.2rem]' />
            <div className='bg-black-3 h-[1.4rem] w-[4.3rem] rounded-[0.2rem]' />
          </div>
        </div>
        <div className='bg-black-3 h-[2.6rem] w-[10.9rem] rounded-[0.2rem]' />
      </div>
      <div className='px-[2rem] pb-[2rem]'>
        <div className='border-black-4 rounded-[0.6rem] border-1 p-[2rem] pt-[2.2rem] pb-[2.1rem]'>
          <div className='flex items-center gap-[1.2rem]'>
            <div className='bg-black-3 relative h-[6.4rem] w-[6.4rem] rounded-full' />
            <div className='flex flex-1 flex-col gap-[0.8rem]'>
              <div className='flex flex-col gap-[0.4rem]'>
                <div className='bg-black-3 h-[1.7rem] w-[3.7rem] rounded-[0.2rem]' />
                <div className='bg-black-3 h-[1.2rem] w-[9rem] rounded-[0.2rem]' />
              </div>
              <div className='flex flex-col gap-[0.4rem]'>
                <div className='bg-black-3 h-[1.2rem] w-[15.8rem] rounded-[0.2rem]' />
                <div className='bg-black-3 h-[1.2rem] w-[3.7rem] rounded-[0.2rem]' />
              </div>
            </div>
            <IconArrowForward className='text-black-6' />
          </div>
        </div>
      </div>
      <SectionTabs value={selectedTab}>
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
          <div className='flex items-center justify-center py-[4rem]'>
            <div className='border-black-4 border-t-black-1 h-[2.4rem] w-[2.4rem] animate-spin rounded-full border-[3px]' />
          </div>
        </SectionTabs.Contents>
      </SectionTabs>
    </div>
  );
};
