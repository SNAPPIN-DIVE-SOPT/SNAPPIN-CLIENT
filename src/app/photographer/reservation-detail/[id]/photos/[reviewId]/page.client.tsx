'use client';

import { ImageSlide } from './components';
import { ReviewStar } from '@/ui';
import { formatShortDate } from '@/utils/formatNumberWithComma';
import { useGetReviewDetail } from './api';

type PageClientProps = {
  reviewId: number;
};

export default function PageClient({ reviewId }: PageClientProps) {
  const { data } = useGetReviewDetail(reviewId);

  return (
    <>
      <div className='flex flex-1 items-center'>
        <ImageSlide images={data?.images?.map((image) => ({ src: image })) ?? []} />
      </div>
      <div className='flex flex-col gap-[1.2rem] px-[2rem] pt-[2rem] pb-[6rem]'>
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
        <p className='caption-14-md text-black-1'>{data?.content ?? ''}</p>
      </div>
    </>
  );
}
