'use client';

import { useRef } from 'react';
import { Divider, ProductCardSkeleton } from '@/ui';
import { MoodCode } from '@/types/moodCode';
import { PhotographerSection, PortfolioSection, ProductSection } from './_section/index';
import { Header } from './components/index';
import { useGetPortfolioDetail } from './api';
import { useScrollRestoreOnParent } from '@/hooks/useScrollRestoreOnParent';

type ClientPageProps = {
  id: string;
};

export default function ClientPage({ id }: ClientPageProps) {
  const { data, isPending } = useGetPortfolioDetail(Number(id));

  const portfolioImages = data?.images?.map((image, idx) => ({
    src: image,
    alt: `${data.description} 포트폴리오 이미지 ${idx}`,
  }));
  const productImage = {
    src: data?.productInfo?.imageUrl ?? '',
    alt: `${data?.productInfo?.title ?? ''} 상품 이미지`,
  };

  const anchorRef = useRef<HTMLDivElement>(null);
  useScrollRestoreOnParent(
    anchorRef,
    `product-detail-scroll:${id}`,
    [id, data?.id, isPending],
  );

  return (
    <div ref={anchorRef}>
      <Header />
      {isPending ? (
        <PortfolioDetailSkeleton />
      ) : (
        <>
          <PortfolioSection
            id={data?.id ?? 0}
            description={data?.description ?? ''}
            images={portfolioImages ?? []}
            isLiked={data?.isLiked ?? false}
            likeCount={data?.likeCount ?? 0}
            snapCategory={data?.snapCategory ?? ''}
            place={data?.place ?? ''}
            startsAt={data?.startsAt ?? ''}
            moods={data?.moods as MoodCode[]}
          />
          <Divider thickness='large' color='bg-black-3' />
          <PhotographerSection
            id={data?.photographerInfo?.id ?? 0}
            name={data?.photographerInfo?.name ?? ''}
            bio={data?.photographerInfo?.bio ?? ''}
            specialties={data?.photographerInfo?.specialties ?? []}
            locations={data?.photographerInfo?.locations ?? []}
          />
          <Divider thickness='large' color='bg-black-3' />
          <ProductSection
            id={data?.productInfo?.id ?? 0}
            image={productImage}
            name={data?.productInfo?.title ?? ''}
            rate={data?.productInfo?.rate ?? 0}
            reviewCount={data?.productInfo?.reviewCount ?? 0}
            photographer={data?.productInfo?.photographer ?? ''}
            price={data?.productInfo?.price ?? 0}
            moods={data?.productInfo?.moods ?? []}
          />
        </>
      )}
    </div>
  );
}

const PortfolioDetailSkeleton = () => {
  return (
    <section>
      <div className='w-full aspect-[3/4] bg-black-3' />
      <div className='px-[2rem] py-[1.6rem]'>
        <div className='flex h-[3rem] justify-between'>
          <div className='bg-black-3 h-[2.5rem] w-[14.4rem] rounded-[0.2rem]' />
          <div className='bg-black-3 h-[2.5rem] w-[4.6rem] rounded-[0.2rem]' />
        </div>
      </div>
      <div className='flex flex-col gap-[0.8rem] p-[2rem]'>
        <span className='caption-14-md text-black-10'>관련 정보</span>
        <div className='flex flex-col gap-[1.2rem] p-[1.6rem] border-1 border-black-5 rounded-[0.6rem]'>
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className='flex h-[1.4rem] gap-[1rem]'>
              <div className='bg-black-3 flex w-[8rem] rounded-[0.2rem]' />
              {idx !== 3 ? (
                <div className='bg-black-3 flex flex-1 rounded-[0.2rem]' />
              ) : (
                <div className='bg-black-3 flex w-[8.6rem] rounded-[0.2rem]' />
              )}
            </div>
          ))}
        </div>
      </div>
      <Divider thickness='large' color='bg-black-3' />
      <div className='flex gap-[1.2rem] p-[2rem]'>
        <div className='bg-black-3 h-[6.4rem] w-[6.4rem] rounded-full' />
        <div className='flex h-[7rem] flex-1 flex-col gap-[0.9rem]'>
          <div className='flex flex-col gap-[0.4rem]'>
            <div className='bg-black-3 h-[1.7rem] w-[3.7rem] rounded-[0.2rem]' />
            <div className='bg-black-3 h-[1.2rem] w-[9rem] rounded-[0.2rem]' />
          </div>
          <div className='flex flex-col gap-[0.4rem]'>
            <div className='bg-black-3 h-[1.2rem] w-[15.8rem] rounded-[0.2rem]' />
            <div className='bg-black-3 h-[1.2rem] w-[3.7rem] rounded-[0.2rem]' />
          </div>
        </div>
      </div>
      <Divider thickness='large' color='bg-black-3' />
      <div className='flex flex-col gap-[1.6rem] px-[2rem] py-[1.6rem]'>
        <span className='font-16-bd'>이 작가님의 상품 살펴보기</span>
        <div className='border-black-5 rounded-[0.6rem] border-1 p-[1.2rem]'>
          <ProductCardSkeleton />
        </div>
      </div>
    </section>
  );
};
