'use client';

import type { ProductCardProps } from '@/ui/product-card/ProductCard';
import { ProductCard } from '@/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IconKeyboardArrowRight } from '@/assets';
import { StateChip, Button } from '@/ui';
import { STATE_CODES, type StateCode } from '@/types/stateCode';

type ReservationCardProps = {
  status: StateCode;
  date: string;
  href: string;
  isReviewed: boolean;
  reviewHref?: string;
  handleReviewClick?: () => void;
} & ProductCardProps;

export default function ReservationCard({
  status,
  date,
  href,
  isReviewed = false,
  reviewHref,
  ...productCardProps
}: ReservationCardProps) {
  const hasReviewWriteButton = status === STATE_CODES.SHOOT_COMPLETED && !isReviewed;
  const router = useRouter();

  const handleReviewClick = () => {
    reviewHref && router.push(reviewHref);
  };

  return (
    <div className='border-black-5 rounded-[0.6rem] border-[0.07rem] p-[1.2rem]'>
      <Link href={href}>
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
      </Link>

      {hasReviewWriteButton && (
        <div className='mt-[1.2rem] flex justify-end'>
          <Button
            size='small'
            color='black'
            display='inline'
            type='button'
            onClick={handleReviewClick}
          >
            리뷰 작성
          </Button>
        </div>
      )}
    </div>
  );
}
