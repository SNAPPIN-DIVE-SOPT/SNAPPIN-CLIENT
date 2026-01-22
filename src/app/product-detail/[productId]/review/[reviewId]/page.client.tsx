'use client';

import { Header, ImageSlide } from './components/index';
import { ReviewStar } from '@/ui/index';
import { formatShortDate } from '@/utils/formatNumberWithComma';
import { useGetReviewDetail } from './api';

type ClientPageProps = {
  reviewId: string;
}

export default function ClientPage({ reviewId }: ClientPageProps) {
  const { data, isPending } = useGetReviewDetail(Number(reviewId));

  const reviewImages = data?.images?.map((image, idx) => ({ src: image, alt: `리뷰 이미지 ${idx}` }));
  const formattedDate = formatShortDate(data?.createdAt ?? '');

  return (
    <div className='flex flex-col min-h-dvh bg-black-10'>
      <Header />
      {isPending
        ? <ReviewDetailSkeleton />
        : <>
           <ImageSlide images={reviewImages ?? []} />
            <div className='flex flex-col gap-[1.2rem] px-[2rem] pt-[2rem] pb-[6rem]'>
              <div className='flex flex-col gap-[0.6rem]'>
                <div className='flex justify-between'>
                  <ReviewStar rating={data?.rating ?? 0} starSize='small' starFillColor='text-neon-black' />
                  <span className='caption-12-md text-black-7'>{formattedDate}</span>
                </div>
                <span className='caption-12-md text-black-7'>{data?.reviewer}</span>
              </div>
              <span className='caption-14-md text-black-1'>{data?.content}</span>
            </div>
          </>
      }
    </div>
  );
}

const ReviewDetailSkeleton = () => {
  return (
    <section>
      <div className='w-full h-[48rem] bg-black-9' />
      <div className='flex flex-col gap-[1.2rem] w-full px-[2rem] pt-[2rem] pb-[6rem]'>
        <div className='flex flex-col gap-[0.6rem]'>
          <div className='flex justify-between h-[1.4rem]'>
            <div className='w-[9.6rem] bg-black-9 rounded-[0.2rem]' />
            <div className='w-[4.5rem] bg-black-9 rounded-[0.2rem]' />
          </div>
          <div className='w-[3.2rem] h-[1.4rem] bg-black-9 rounded-[0.2rem]' />
        </div>
        <div className='flex flex-col gap-[0.6rem]'>
          <div className='w-[25.1rem] h-[1.7rem] bg-black-9 rounded-[0.2rem]' />
          <div className='w-[19.4rem] h-[1.7rem] bg-black-9 rounded-[0.2rem]' />
        </div>
      </div>
    </section>
  );
}