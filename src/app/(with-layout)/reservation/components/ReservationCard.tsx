'use client';

import type { ProductCardProps } from '@/ui/product-card/ProductCard';
import { ProductCard } from '@/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IconKeyboardArrowRight } from '@/assets';
import { StateChip, Button } from '@/ui';
import { STATE_CODES, StateCode } from '@/types/stateCode';

type ReservationCardProps = {
  status: StateCode;
  date: string;
  href: string;
  isReviewed: boolean;
  reviewHref: string;
} & ProductCardProps;

export default function ReservationCard({
  image,
  name,
  rating,
  reviewCount,
  author,
  price,
  tags,
  className,
  status,
  date,
  href,
  isReviewed = false,
  reviewHref,
}: ReservationCardProps) {
  const hasReviewWriteButton = status === STATE_CODES.SHOOT_COMPLETED && !isReviewed;
  const router = useRouter();

  return (
    <Link className='border-black-5 rounded-[0.6rem] border-[0.07rem] p-[1.2rem]' href={href}>
      <div className='flex flex-col gap-[0.6rem]'>
        <div className='caption-10-md text-black-7'>
          <span>{date}</span>
        </div>
        <div className='mb-[1.2rem] flex justify-between'>
          <StateChip label={status} />
          <button type='button' className='flex items-center'>
            <span className='text-black-7 caption-12-md'>예약상세</span>
            <IconKeyboardArrowRight className='text-black-7 h-[2.4rem] w-[2.4rem]' />
          </button>
        </div>
      </div>
      <ProductCard
        image={image}
        name={name}
        rating={rating}
        reviewCount={reviewCount}
        author={author}
        price={price}
        tags={tags}
        className={className}
      />
      {hasReviewWriteButton ? (
        <div className='mt-[1.2rem] flex justify-end'>
          <Button
            size='small'
            color='black'
            display='inline'
            type='button'
            onClick={() => router.push(reviewHref)}
          >
            리뷰 작성
          </Button>
        </div>
      ) : null}
    </Link>
  );
}
