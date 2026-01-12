'use client';

import { Suspense, use, useEffect, useMemo, useState } from 'react';
import { useAtomValue } from 'jotai';
import { useSearchParams } from 'next/navigation';

import { HeaderNavigation, PhotoBox } from './components';
import { getReservationDetailMockById } from '@/app/reservation-detail/[id]/mock/reservationDetail.mock';
import { ReviewByReservationProductIdAtom } from '@/app/review/store';
import { Carousel, CarouselContent, CarouselItem, Divider, IconButton } from '@/ui';
import type { CarouselApi } from '@/ui';
import { IconArrowBack, IconArrowForward } from '@/assets';
import ReviewStar from '@/ui/review-star/ReviewStar';

type ReviewPhotosPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const getImageIndexBySearchParams = (index: string | null) => {
  const resolvedIndex = Number(index);
  return Number.isNaN(resolvedIndex) ? 0 : resolvedIndex;
};

const createReviewCreatedAtLabel = (createdAt: string) => {
  const match = createdAt.match(/(\d{4})[-.](\d{2})[-.](\d{2})/);
  return match ? `${match[1].slice(2)}.${match[2]}.${match[3]}` : createdAt;
};

const getClampedIndex = (index: number, length: number) =>
  length <= 0 ? 0 : Math.max(0, Math.min(length - 1, index));

type ReviewPhotosPageContentProps = ReviewPhotosPageProps;

const ReviewPhotosPageContent = ({ params }: ReviewPhotosPageContentProps) => {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const reviewByReservationProductId = useAtomValue(ReviewByReservationProductIdAtom);

  const reservationProductId = Number(id);
  const resolvedReservationProductId = Number.isNaN(reservationProductId)
    ? 1
    : reservationProductId;
  const reviewFromStore = reviewByReservationProductId[resolvedReservationProductId];
  const reviewFromMock = getReservationDetailMockById(resolvedReservationProductId).reviewInfo;
  const reviewImages = reviewFromStore?.imageUrls ?? reviewFromMock?.images ?? [];
  const reviewer = reviewFromStore?.reviewer ?? reviewFromMock?.reviewer ?? '아이디';
  const rating = reviewFromStore?.rating ?? reviewFromMock?.rating ?? 0;
  const createdAt = reviewFromStore?.createdAt ?? reviewFromMock?.createdAt ?? '';
  const content = reviewFromStore?.content ?? reviewFromMock?.content ?? '';

  const imageIndex = getImageIndexBySearchParams(searchParams.get('index'));
  const initialIndex = useMemo(
    () => getClampedIndex(imageIndex, reviewImages.length),
    [imageIndex, reviewImages.length],
  );

  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState<boolean>(false);
  const [canScrollNext, setCanScrollNext] = useState<boolean>(false);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const handleCarouselSelect = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };

    carouselApi.scrollTo(initialIndex, true);
    handleCarouselSelect();
    carouselApi.on('select', handleCarouselSelect);
    carouselApi.on('reInit', handleCarouselSelect);
    return () => {
      carouselApi.off('select', handleCarouselSelect);
      carouselApi.off('reInit', handleCarouselSelect);
    };
  }, [carouselApi, initialIndex]);

  const handleScrollPrevious = () => {
    carouselApi?.scrollPrev();
  };

  const handleScrollNext = () => {
    carouselApi?.scrollNext();
  };

  const hasMultipleImages = reviewImages.length >= 2;

  return (
    <div className='bg-black-10 flex min-h-full flex-col'>
      <HeaderNavigation isVisible={true} />
      <Divider color='bg-black-8' />
      <div className='relative'>
        <Carousel setApi={setCarouselApi} opts={{ startIndex: initialIndex }}>
          <CarouselContent className='ml-0'>
            {reviewImages.map((imageUrl) => (
              <CarouselItem key={imageUrl} className='pl-0'>
                <PhotoBox imageSrc={imageUrl} imageAlt='포토 리뷰 이미지' />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {hasMultipleImages ? (
          <>
            {canScrollPrev ? (
              <IconButton
                className='absolute top-1/2 left-[1.2rem] z-20 h-[4.4rem] w-[4.4rem] -translate-y-1/2 bg-black/30'
                onClick={handleScrollPrevious}
              >
                <IconArrowBack className='text-black-1 mx-auto h-[2.4rem] w-[2.4rem]' />
              </IconButton>
            ) : null}
            {canScrollNext ? (
              <IconButton
                className='bg-black-10/30 absolute top-1/2 right-[1.2rem] z-20 h-[4.4rem] w-[4.4rem] -translate-y-1/2'
                onClick={handleScrollNext}
              >
                <IconArrowForward className='text-black-1 mx-auto h-[2.4rem] w-[2.4rem]' />
              </IconButton>
            ) : null}
          </>
        ) : null}
      </div>

      <div className='bg-black-10 mt-[8rem] flex flex-col gap-[1.2rem] px-[2rem]'>
        <div className='flex flex-col gap-[0.6rem]'>
          <div className='flex items-center justify-between'>
            <ReviewStar rating={rating} starSize='small' starFillColor='text-neon-black' />
            <div className='caption-12-md text-black-7'>
              {createReviewCreatedAtLabel(createdAt)}
            </div>
          </div>
          <div className='caption-12-md text-black-7 mt-[0.8rem]'>{reviewer}</div>
        </div>
        <div className='caption-14-md text-black-1 whitespace-pre-wrap'>{content}</div>
      </div>
    </div>
  );
};

const ReviewPhotosPageFallback = () => <div className='bg-black-10 flex min-h-full flex-col' />;

export default function Page({ params }: ReviewPhotosPageProps) {
  return (
    <Suspense fallback={<ReviewPhotosPageFallback />}>
      <ReviewPhotosPageContent params={params} />
    </Suspense>
  );
}
