'use client';

import { ProductCard, ProductCardSkeleton } from '@snappin/design-system';
import { useGetReservationDetail } from '../api';
import { useAuth } from '@/auth/hooks/useAuth';

type ProductInfoSectionProps = { reservationId: number };

export default function ProductInfoSection({ reservationId }: ProductInfoSectionProps) {
  const { isLogIn } = useAuth();
  const { data: reservationData, isPending } = useGetReservationDetail(
    reservationId,
    isLogIn === true,
  );

  if (isPending || !reservationData?.productInfo)
    return (
      <div className='p-[1.6rem_4.2rem_0_2rem]'>
        <ProductCardSkeleton />;
      </div>
    );

  const {
    imageUrl = '',
    title = '',
    rate = 0,
    reviewCount = 0,
    photographer = '',
    price = 0,
    moods = [],
  } = reservationData.productInfo;

  return (
    <section className='py-[1.6rem] pr-[4.2rem] pl-[2rem]'>
      <ProductCard
        image={{ src: imageUrl, alt: title }}
        name={title}
        rate={rate}
        reviewCount={reviewCount}
        photographer={photographer}
        price={price}
        moods={moods}
      />
    </section>
  );
}
