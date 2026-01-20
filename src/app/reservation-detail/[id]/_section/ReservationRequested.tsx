'use client';

import { Button, ProductCard } from '@/ui';
import { STATE_CODES, type StateCode } from '@/types/stateCode';

type ReservationRequestedProps = {
  imageUrl?: string;
  title?: string;
  rate?: number;
  reviewCount?: number;
  photographer?: string;
  price?: number;
  moods?: string[];
  reservationStatus: StateCode;
  handleReservationCancelClick: () => void;
  handleInquiryClick: () => void;
};
export default function ReservationRequested({
  imageUrl = '',
  title = '',
  rate = 0,
  reviewCount = 0,
  photographer = '',
  price = 0,
  moods = [],
  reservationStatus,
  handleReservationCancelClick,
  handleInquiryClick,
}: ReservationRequestedProps) {
  const hasCancelButton =
    reservationStatus !== STATE_CODES.RESERVATION_REFUSED &&
    reservationStatus !== STATE_CODES.RESERVATION_CANCELED;

  return (
    <section className='bg-black-1 px-[2rem] pt-[1.7rem] pb-[1.2rem]'>
      <span className='caption-14-bd text-black-10'>예약 요청 상품</span>
      <div className='mt-[1.2rem] mb-[1.7rem]'>
        <ProductCard
          image={{ src: imageUrl, alt: title || '상품 이미지' }}
          name={title}
          rate={rate}
          reviewCount={reviewCount}
          photographer={photographer}
          price={price}
          moods={moods ?? []}
        />
      </div>
      <div className='flex flex-row gap-[0.6rem]'>
        {hasCancelButton && (
          <Button
            size='small'
            color='white'
            display='inline'
            className='w-full'
            onClick={handleReservationCancelClick}
          >
            예약 취소
          </Button>
        )}

        <Button
          size='small'
          color='black'
          display='inline'
          className='w-full'
          onClick={handleInquiryClick}
        >
          문의하기
        </Button>
      </div>
    </section>
  );
}
