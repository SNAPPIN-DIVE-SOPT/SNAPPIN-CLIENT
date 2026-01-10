'use client';

import type { ComponentProps } from 'react';
import { useAtomValue } from 'jotai';

import { RESERVATION_MOCK } from '@/app/client/(with-layout)/reservation/mock/reservationList.mock';
import { ReviewedByReservationProductIdAtom } from '@/app/client/(with-layout)/reservation/store';
import { Button, ProductCard } from '@/ui';

type ShootCompletedProps = {
  reservationProductId: number;
  hasReviewCreated: boolean;
  handleInquiryClick: () => void;
  handleReviewCreateClick: () => void;
};

type ReservationMockProduct = (typeof RESERVATION_MOCK.products)[number];

const createProductCardPropsByReservationProduct = (
  reservationProduct: ReservationMockProduct,
): ComponentProps<typeof ProductCard> => ({
  image: {
    src: reservationProduct.imageUrl,
    alt: `${reservationProduct.title} 상품 이미지`,
  },
  name: reservationProduct.title,
  rating: reservationProduct.rate,
  reviewCount: reservationProduct.reviewCount,
  author: reservationProduct.photographer,
  price: reservationProduct.price,
  tags: reservationProduct.moods,
  className: 'w-full',
});

export default function ShootCompleted({
  reservationProductId,
  hasReviewCreated,
  handleInquiryClick,
  handleReviewCreateClick,
}: ShootCompletedProps) {
  const reviewedByReservationProductId = useAtomValue(ReviewedByReservationProductIdAtom);
  const selectedReservationProduct =
    RESERVATION_MOCK.products.find(({ id }) => id === reservationProductId) ??
    RESERVATION_MOCK.products[0];

  const reservationProducts = selectedReservationProduct ? [selectedReservationProduct] : [];
  const hasReviewed =
    hasReviewCreated ||
    (reviewedByReservationProductId[reservationProductId] ?? selectedReservationProduct.isReviewed);

  return (
    <section className='bg-black-1 px-[2rem] pt-[1.7rem] pb-[1.2rem]'>
      <label className='caption-14-bd text-black-10'>촬영 완료</label>
      <div className='mt-[1.2rem] mb-[1.7rem]'>
        {reservationProducts.map((reservationProduct) => (
          <ProductCard
            key={reservationProduct.id}
            {...createProductCardPropsByReservationProduct(reservationProduct)}
          />
        ))}
      </div>
      {hasReviewed ? (
        <Button
          size='small'
          color='transparent'
          display='inline'
          type='button'
          className='w-full'
          onClick={handleInquiryClick}
        >
          문의하기
        </Button>
      ) : (
        <div className='flex flex-row gap-[0.6rem]'>
          <Button
            size='small'
            color='transparent'
            display='inline'
            type='button'
            className='w-full'
            onClick={handleInquiryClick}
          >
            문의하기
          </Button>
          <Button
            size='small'
            color='black'
            display='inline'
            type='button'
            className='w-full'
            onClick={handleReviewCreateClick}
          >
            리뷰 작성
          </Button>
        </div>
      )}
    </section>
  );
}
