'use client';

import type { ProductCardProps } from '@snappin/design-system/ui/product-card/ProductCard';
import { ProductCard } from '@snappin/design-system';
import { useRouter } from 'next/navigation';
import { IconKeyboardArrowRight } from '@snappin/design-system/assets';
import { StateChip, Button } from '@snappin/design-system';
import { STATE_CODES, type StateCode } from '@/types/stateCode';
import { ROUTES } from '@/constants/routes/routes';

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
    router.push(ROUTES.RESERVATION(reservationId));
  };

  const handleReviewClick = () => {
    router.push(ROUTES.REVIEW_FORM(reservationId));
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
