'use client';

import { ProductCard, IconButton, StateChip } from '@/ui';
import { MoodCode } from '@/types/moodCode';
import { StateCode } from '@/types/stateCode';
import { IconKeyboardArrowRight } from '@/assets';
import { useRouter } from 'next/navigation';

type ReservationCardProps = {
  id: number;
  status: StateCode;
  image: { src: string; alt?: string };
  name: string;
  rating: number;
  reviewCount: number;
  author: string;
  price: number;
  tags: MoodCode[];
};

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
}: ReservationCardProps) {
  const router = useRouter();

  const handleDetailClick = () => {
    router.push(`/author/reservation-detail/${id}`);
  };

  return (
    <div className='flex px-[2rem] py-[1.2rem]'>
      <div className='border-black-5 flex w-full flex-col gap-[1.2rem] rounded-[0.6rem] border border-[0.7px] p-[1.2rem]'>
        <div className='flex w-full items-center justify-between'>
          <StateChip label={status} />
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
  );
}
