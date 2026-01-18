'use client';

import { Button, ProductCard } from '@/ui';
import { STATE_CODES, type StateCode } from '@/types/stateCode';

type ReservationRequestedProps = {
  productInfo: {
    imageUrl: string;
    title: string;
    rate: number;
    reviewCount: number;
    photographer: string;
    price: number;
    moods: string[];
  };
  reservationId: number;
  reservationStatus: StateCode;
  handleReservationCancelClick: () => void;
  handleInquiryClick: () => void;
};

export default function ReservationRequested({
  productInfo,
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
          image={{
            src: productInfo.imageUrl,
            alt: `${productInfo.title}`,
          }}
          name={productInfo.title}
          rate={productInfo.rate}
          reviewCount={productInfo.reviewCount}
          photographer={productInfo.photographer}
          price={productInfo.price}
          moods={productInfo.moods}
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
