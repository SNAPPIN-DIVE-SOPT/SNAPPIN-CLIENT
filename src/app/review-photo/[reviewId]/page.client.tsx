'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ImageCarousel, ReviewStar } from '@/ui/';
import { formatShortDate } from '@/utils/formatDate';
import Skeleton from './components/skeleton/Skeleton';
import { useGetReviewDetail } from './api';

type PageClientProps = {
  reviewId: number;
};

export default function PageClient({ reviewId }: PageClientProps) {
  const searchParams = useSearchParams();
  const { data, isPending } = useGetReviewDetail(reviewId);

  const initialIndex = useMemo(() => {
    const imageParam = searchParams.get('image');
    if (!imageParam) return 0;

    const parsed = Number(imageParam);
    if (Number.isInteger(parsed) && parsed >= 0) {
      const maxIndex = Math.max((data?.images?.length ?? 1) - 1, 0);
      return Math.min(parsed, maxIndex);
    }

    const imageIndex = data?.images?.findIndex((image) => image === imageParam) ?? -1;
    return imageIndex >= 0 ? imageIndex : 0;
  }, [data?.images, searchParams]);

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
        images={data.images?.map((image) => ({ src: image })) ?? []}
        initialIndex={initialIndex}
      />
      <div className='mt-[2rem] mb-[5rem] flex w-full flex-col gap-[1.2rem] px-[2rem]'>
        <div className='flex flex-col gap-[0.6rem]'>
          <div className='flex items-center justify-between'>
            <ReviewStar
              starSize='small'
              starFillColor='text-neon-black'
              rating={data.rating ?? 0}
            />
            <span className='caption-12-md text-black-7'>
              {formatShortDate(data.createdAt ?? '')}
            </span>
          </div>
          <span className='caption-12-md text-black-7'>{data.reviewer ?? ''}</span>
        </div>
        <p className='caption-14-rg text-black-1'>{data.content ?? ''}</p>
      </div>
    </>
  );
}
