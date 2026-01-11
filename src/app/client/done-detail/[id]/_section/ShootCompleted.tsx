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

type ReservationMockReservation = (typeof RESERVATION_MOCK.reservations)[number]['reservation'];

const createProductCardPropsByReservationProduct = (
  reservation: ReservationMockReservation,
): ComponentProps<typeof ProductCard> => ({
  image: {
    src: reservation.product.imageUrl,
    alt: `${reservation.product.title} 상품 이미지`,
  },
  name: reservation.product.title,
  rating: reservation.product.rate,
  reviewCount: reservation.product.reviewCount,
  author: reservation.product.photographer,
  price: reservation.product.price,
  tags: reservation.product.moods,
  className: 'w-full',
});

export default function ShootCompleted({
  reservationProductId,
  hasReviewCreated,
  handleInquiryClick,
  handleReviewCreateClick,
}: ShootCompletedProps) {
  const reviewedByReservationProductId = useAtomValue(ReviewedByReservationProductIdAtom);
  const selectedReservation =
    RESERVATION_MOCK.reservations.find(
      ({ reservation }) => reservation.reservationId === reservationProductId,
    )?.reservation ?? RESERVATION_MOCK.reservations[0].reservation;

  const reservations = selectedReservation ? [selectedReservation] : [];
  const hasReviewed =
    hasReviewCreated ||
    (reviewedByReservationProductId[reservationProductId] ??
      selectedReservation.product.isReviewed);

  return (
    <section className='bg-black-1 px-[2rem] pt-[1.7rem] pb-[1.2rem]'>
      <label className='caption-14-bd text-black-10'>촬영 완료</label>
      <div className='mt-[1.2rem] mb-[1.7rem]'>
        {reservations.map((reservation) => (
          <ProductCard
            key={reservation.reservationId}
            {...createProductCardPropsByReservationProduct(reservation)}
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
