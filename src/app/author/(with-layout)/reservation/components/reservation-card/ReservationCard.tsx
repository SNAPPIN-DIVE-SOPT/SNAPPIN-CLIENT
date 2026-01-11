'use client';

import { ProductCard, IconButton, StateChip } from '@/ui';
import { StateCode } from '@/types/stateCode';
import { IconKeyboardArrowRight } from '@/assets';
import { useRouter } from 'next/navigation';
import { ProductCardProps } from '@/ui/product-card/ProductCard';
type ReservationCardProps = {
  id: number;
  status: StateCode;
  date: string;
} & ProductCardProps;

export default function ReservationCard({
  id,
  status,
  image,
  name,
  rating,
  reviewCount,
  author,
  price,
  tags,
  date,
}: ReservationCardProps) {
  const router = useRouter();

  const handleDetailClick = () => {
    router.push(`/author/reservation-detail/${id}`);
  };

  return (
    <div className='flex px-[2rem] py-[1.2rem]'>
      <div className='border-black-5 flex w-full flex-col gap-[0.6rem] rounded-[0.6rem] border border-[0.7px] p-[1.2rem]'>
        <span className='caption-10-md text-black-7'>{date}</span>
        <div className='flex flex-col gap-[1.2rem]'>
          <div className='flex w-full items-center justify-between'>
            <div className='flex items-center gap-[0.8rem]'>
              <StateChip label={status} />
              <div className='flex items-center gap-[0.2rem]'>
                <span className='font-16-bd'>{author}</span>
                <span className='font-16-md'>님</span>
              </div>
            </div>
            <IconButton
              className='text-black-8 flex items-center bg-white'
              onClick={handleDetailClick}
            >
              예약상세
              <IconKeyboardArrowRight />
            </IconButton>
          </div>
          <ProductCard
            image={image}
            name={name}
            rating={rating}
            reviewCount={reviewCount}
            author={author}
            price={price}
            tags={tags}
          />
        </div>
      </div>
    </div>
  );
}
