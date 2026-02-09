'use client';

import { ImageSlide } from './components';
import { ReviewStar } from '@/ui';
import { formatShortDate } from '@/utils/formatNumberWithComma';
import { useGetReviewDetail } from './api';
import Skeleton from './components/skeleton/Skeleton';
import { useSearchParams } from 'next/navigation';

type PageClientProps = {
  reviewId: number;
};

export default function PageClient({ reviewId }: PageClientProps) {
  const searchParams = useSearchParams();
  const initialIndex = Number(searchParams.get('image') ?? 0);
  const { data ,isPending} = useGetReviewDetail(reviewId);

  if (isPending) {
    return <Skeleton />;
  }

  return (
    <>
      <ImageSlide
        images={data?.images?.map((image) => ({ src: image })) ?? []}
        initialIndex={initialIndex}
      />
      <div className='mt-[2rem] mb-[5rem] flex w-full flex-col gap-[1.2rem] px-[2rem]'>
        <div className='flex flex-col gap-[0.6rem]'>
          <div className='flex items-center justify-between'>
            <ReviewStar
              starSize='small'
              starFillColor='text-neon-black'
              rating={data?.rating ?? 0}
            />
            <span className='caption-12-md text-black-7'>
              {formatShortDate(data?.createdAt ?? '')}
            </span>
          </div>
          <span className='caption-12-md text-black-7'>{data?.reviewer ?? ''}</span>
        </div>
        <p className='caption-14-rg text-black-1'>{data?.content ?? ''}</p>
      </div>
    </>
  );
}
