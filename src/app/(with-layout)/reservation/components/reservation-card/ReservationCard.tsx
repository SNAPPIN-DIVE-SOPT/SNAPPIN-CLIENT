'use client';

import type { ProductCardProps } from '@/ui/product-card/ProductCard';
import { ProductCard } from '@/ui';
import { useRouter } from 'next/navigation';
import { IconKeyboardArrowRight } from '@/assets';
import { StateChip, Button } from '@/ui';
import { STATE_CODES, type StateCode } from '@/types/stateCode';

export type ReservationCardProps = {
  reservationId: number;
  status: StateCode;
  date: string;
  isReviewed: boolean;
} & ProductCardProps;

export default function ReservationCard({
  reservationId,
  status,
  date,
  isReviewed,
  ...productCardProps
}: ReservationCardProps) {
  const router = useRouter();

  const hasReviewWriteButton = status === STATE_CODES.SHOOT_COMPLETED && !isReviewed;

  const handleDetailClick = () => {
    if (status === STATE_CODES.SHOOT_COMPLETED) {
      router.push(`/photo-final-detail/${reservationId}`);
    } else {
      router.push(`/reservation-detail/${reservationId}`);
    }
  };

  const handleReviewClick = () => {
    router.push(`/review-form/${reservationId}`);
  };

  return (
    <div className='border-black-4 w-full rounded-[0.6rem] border-[0.07rem] bg-transparent p-[1.2rem] text-left'>
      <div role='button' onClick={handleDetailClick}>
        <div className='flex flex-col gap-[0.6rem]'>
          <span className='caption-10-md text-black-7'>{date}</span>
          <div className='mb-[1.2rem] flex justify-between'>
            <StateChip label={status} />
            <div className='flex items-center'>
              <span className='text-black-7 caption-12-md'>예약상세</span>
              <IconKeyboardArrowRight className='text-black-7 h-[2.4rem] w-[2.4rem]' />
            </div>
          </div>
        </div>
        <ProductCard {...productCardProps} />
      </div>
      {hasReviewWriteButton && (
        <div className='mt-[1.2rem] flex justify-end'>
          <Button size='small' color='black' display='inline' onClick={handleReviewClick}>
            리뷰 작성
          </Button>
        </div>
      )}
    </div>
  );
}
