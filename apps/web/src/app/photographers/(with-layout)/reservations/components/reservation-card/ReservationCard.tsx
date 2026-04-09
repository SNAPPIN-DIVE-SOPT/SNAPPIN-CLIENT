'use client';

import { IconButton, StateChip } from '@snappin/design-system';
import { ProductCardProps, StateCode } from '@snappin/shared/types';
import { IconKeyboardArrowRight } from '@snappin/design-system/assets';
import { useRouter } from 'next/navigation';
import { ProductCard } from '@/ui/product-card';
import { formatCreatedAt } from '@/utils/formatDate';
import { PHOTOGRAPHERS_ROUTES } from '@/constants/routes/routes';

type ReservationCardProps = {
  reservationId: number;
  status: StateCode;
  date: string;
  client: string;
} & ProductCardProps;

export default function ReservationCard({
  preload = false,
  reservationId,
  status,
  image,
  name,
  rate,
  reviewCount,
  photographer,
  price,
  client,
  moods,
  date,
}: ReservationCardProps) {
  const router = useRouter();

  const handleDetailClick = () => {
    router.push(PHOTOGRAPHERS_ROUTES.RESERVATION(reservationId));
  };

  return (
    <div className='flex cursor-pointer p-[1.6rem]' onClick={handleDetailClick}>
      <div className='border-black-5 flex w-full flex-col gap-[0.6rem] rounded-[0.6rem] border border-[0.7px] p-[1.2rem]'>
        <span className='caption-10-md text-black-7'>{formatCreatedAt(date)}</span>
        <div className='flex flex-col gap-[1.2rem]'>
          <div className='flex w-full items-center justify-between'>
            <div className='flex items-center gap-[0.8rem]'>
              <StateChip label={status} />
              <div className='flex items-center gap-[0.2rem]'>
                <span className='font-16-bd'>{client}</span>
                <span className='font-16-md'>님</span>
              </div>
            </div>
            <IconButton className='caption-12-md text-black-7 flex items-center bg-white'>
              예약상세
              <IconKeyboardArrowRight />
            </IconButton>
          </div>
          <ProductCard
            preload={preload}
            image={image}
            name={name}
            rate={rate}
            reviewCount={reviewCount}
            photographer={photographer}
            price={price}
            moods={moods}
          />
        </div>
      </div>
    </div>
  );
}
