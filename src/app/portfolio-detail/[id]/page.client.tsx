'use client';

import { Divider, ProductCardSkeleton } from '@/ui';
import { MoodCode } from '@/types/moodCode';
import { PhotographerSection, PortfolioSection, ProductSection } from './_section/index';
import { Header } from './components/index';
import { useGetPortfolioDetail } from './api';

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

  return (
    <div>
      <Header />
      {isPending
        ? <PortfolioDetailSkeleton />
        : <>
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
      }
    </div>
  );
}

const PortfolioDetailSkeleton = () => {
  return (
    <section>
      <div className='w-full aspect-square bg-black-3' />
      <div className='px-[2rem] py-[1.6rem]'>
        <div className='flex justify-between h-[3rem]'>
          <div className='w-[14.4rem] h-[2.5rem] bg-black-3 rounded-[0.2rem]' />
          <div className='w-[4.6rem] h-[2.5rem] bg-black-3 rounded-[0.2rem]' />
        </div>
      </div>
      <div className='flex flex-col gap-[0.8rem] p-[2rem]'>
        <span className='caption-12-md text-black-10'>관련 정보</span>
        <div className='flex flex-col gap-[1.2rem] p-[1.6rem] border-1 border-black-5 rounded-[0.6rem]'>
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className='flex gap-[1rem] h-[1.4rem]'>
              <div className='flex w-[8rem] bg-black-3 rounded-[0.2rem]' />
              {idx !== 3
                ? <div className='flex flex-1 bg-black-3 rounded-[0.2rem]' />
                : <div className='flex w-[8.6rem] bg-black-3 rounded-[0.2rem]' />
              }
            </div>
          ))}
        </div>
      </div>
      <Divider thickness='large' color='bg-black-3' />
      <div className='flex gap-[1.2rem] p-[2rem]'>
        <div className='w-[6.4rem] h-[6.4rem] bg-black-3 rounded-full' />
        <div className='flex flex-col flex-1 gap-[0.9rem] h-[7rem]'>
          <div className='flex flex-col gap-[0.4rem]'>
            <div className='w-[3.7rem] h-[1.7rem] bg-black-3 rounded-[0.2rem]'/>
            <div className='w-[9rem] h-[1.2rem] bg-black-3 rounded-[0.2rem]' />
          </div>
          <div className='flex flex-col gap-[0.4rem]'>
            <div className='w-[15.8rem] h-[1.2rem] bg-black-3 rounded-[0.2rem]' />
            <div className='w-[3.7rem] h-[1.2rem] bg-black-3 rounded-[0.2rem]' />
          </div>
        </div>
      </div>
      <Divider thickness='large' color='bg-black-3' />
      <div className='flex flex-col gap-[1.6rem] px-[2rem] py-[1.6rem]'>
        <span className='caption-14-bd'>이 작가님의 상품 살펴보기</span>
        <div className='p-[1.2rem] border-1 border-black-5 rounded-[0.6rem]'>
          <ProductCardSkeleton />
        </div>
      </div>
    </section>
  );
}