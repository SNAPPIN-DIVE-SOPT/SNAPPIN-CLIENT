'use client';

import { ImageCarousel, ReviewStar } from '@/ui';
import { formatShortDate } from '@/utils/formatDate';
import { GetReviewDetailResponse } from '@/swagger-api/data-contracts';
import Skeleton from './Skeleton';

type PhotoReviewProps = {
  isPending: boolean;
  data?: GetReviewDetailResponse;
  initialIndex: number;
};

export default function PhotoReview({ isPending, data, initialIndex }: PhotoReviewProps) {
  if (isPending) {
    return <Skeleton />;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <ImageCarousel
        variant='sideButtons'
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
