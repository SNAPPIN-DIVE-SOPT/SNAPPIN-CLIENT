import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { Divider, ReviewStar } from '@/ui';
import { formatDate } from '@/utils/formatDate';
import { formatNumber } from '@/utils/formateNumber';
import { useGetProductReviewList } from '../api';

type ReviewListSectionProps = {
  productId: string;
  averageRate: number;
};

type ReviewProps = {
  id: number;
  rate: number;
  createdAt: string;
  reviewer: string;
  images: string[];
  content: string;
};

export default function ReviewListSection({ productId, averageRate }: ReviewListSectionProps) {
  const { data, isFetching, fetchNextPage, hasNextPage } = useGetProductReviewList(
    Number(productId),
  );
  const { ref, inView } = useInView();

  const reviewList = data?.pages.flatMap((page) => page.data?.reviews ?? []) ?? [];
  const isEmpty = reviewList?.length === 0;

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isFetching && isEmpty) {
    return (
      <section>
        <ReviewListSectionSkeleton />
      </section>
    );
  }

  if (isEmpty) {
    return (
      <section>
        <div className='flex items-center justify-center pt-[8rem] pb-[15.8rem]'>
          <span className='caption-14-rg text-black-6 text-center'>아직 작성된 리뷰가 없어요</span>
        </div>
      </section>
    );
  }

  return (
    <section className='mb-[7.4rem]'>
      <div className='flex gap-[0.8rem] p-[2rem]'>
        <ReviewStar rating={isEmpty ? 0 : averageRate} starSize='large' />
        <span className='title-20-bd text-black-10'>{isEmpty ? '0.0' : averageRate}</span>
      </div>
      <Divider thickness='large' color='bg-black-3' className='w-full' />
      {reviewList?.map((review, idx) => {
        const isLast = idx === reviewList.length - 1;

        return (
          <div key={review.id} ref={isLast ? ref : undefined}>
            <Review
              id={review.id ?? 0}
              rate={review.rating ?? 0}
              createdAt={review.createdAt ?? ''}
              reviewer={review.reviewer ?? ''}
              images={review.images ?? []}
              content={review.content ?? ''}
            />
            {!isLast && <Divider thickness='large' color='bg-black-3' className='w-full' />}
          </div>
        );
      })}
    </section>
  );
}

function Review({ id, rate, createdAt, reviewer, images, content }: ReviewProps) {
  const pathname = usePathname();
  const reviewImages = images.map((image, idx) => ({
    src: image,
    alt: `${reviewer}님의 리뷰 이미지 ${idx}`,
  }));
  const formattedDate = formatDate(createdAt)
    .slice(2)
    .split('.')
    .map((number) => formatNumber(Number(number)))
    .join('.');

  return (
    <section className='flex flex-col gap-[1.2rem] overflow-hidden py-[2rem]'>
      {/* 별점, 날짜, 아이디 */}
      <div className='flex flex-col gap-[0.6rem] px-[2rem]'>
        <div className='flex justify-between'>
          <ReviewStar rating={rate} starSize='small' />
          <span className='caption-12-md text-black-7'>{formattedDate}</span>
        </div>
        <span className='caption-12-md text-black-7'>{reviewer}</span>
      </div>
      {/* 이미지 캐러셀 */}
      <div className='scrollbar-hide flex w-full gap-[0.4rem] overflow-x-auto px-[2rem]'>
        {reviewImages.map((image, idx) => (
          <Link
            href={{
              pathname: `${pathname}/review/${id}`,
              query: { image: idx },
            }}
            key={idx}
            className='relative h-[14rem] w-[14rem] shrink-0'
          >
            <Image src={image.src} alt={image.alt} fill className='object-cover' />
          </Link>
        ))}
      </div>
      {/* 리뷰 내용 */}
      <span className='caption-14-md text-black-10 px-[2rem]'>{content}</span>
    </section>
  );
}

const ReviewListSectionSkeleton = () => {
  return (
    <section>
      <div className='flex justify-start gap-[0.8rem] p-[2rem]'>
        <div className='bg-black-3 h-[2rem] w-[13.2rem] rounded-[0.2rem]' />
        <div className='bg-black-3 h-[2rem] w-[3.1rem] rounded-[0.2rem]' />
      </div>
      <Divider thickness='large' color='bg-black-3' />
      <div className='flex flex-col gap-[1.2rem] pt-[2rem]'>
        <div className='flex flex-col gap-[0.6rem] px-[2rem]'>
          <div className='flex justify-between'>
            <div className='bg-black-3 h-[1.4rem] w-[9.6rem] rounded-[0.2rem]' />
            <div className='bg-black-3 h-[1.4rem] w-[4.5rem] rounded-[0.2rem]' />
          </div>
          <div className='bg-black-3 h-[1.4rem] w-[3.2rem] rounded-[0.2rem]' />
        </div>
        <div className='flex gap-[0.4rem] overflow-hidden pl-[2rem]'>
          <div className='bg-black-3 h-[14rem] w-[14rem] shrink-0' />
          <div className='bg-black-3 h-[14rem] w-[14rem] shrink-0' />
          <div className='bg-black-3 h-[14rem] w-[14rem] shrink-0' />
        </div>
        <div className='flex flex-col gap-[0.6rem] px-[2rem]'>
          <div className='bg-black-3 h-[1.7rem] w-[25.1rem] rounded-[0.2rem]' />
          <div className='bg-black-3 h-[1.7rem] w-[19.4rem] rounded-[0.2rem]' />
        </div>
      </div>
    </section>
  );
};
