'use client';

import {
  ProductStatus,
  Receipt,
  ReservationDetail,
  ReviewDetail,
  SectionSkeleton,
} from './_section';
import NavigationClient from './components/navigation-client/Navigation.client';
import { StateCode } from '@/types/stateCode';
import { Divider } from '@/ui';
import { useGetReservationDetail } from './api';
import { useAuth } from '@/auth/hooks/useAuth';
import { notFound } from 'next/navigation';

type PhotoFinalDetailPageProps = {
  id: string;
};

export default function Page({ id }: PhotoFinalDetailPageProps) {
  const { isLogIn } = useAuth();
  const reservationId = Number(id);

  if (Number.isNaN(reservationId)) {
    notFound();
  }

  const { data: reservationData, isPending } = useGetReservationDetail(
    reservationId,
    isLogIn === true,
  );

  if (isPending) {
    return (
      <div className='bg-black-3 flex min-h-dvh flex-col'>
        <NavigationClient />
        <SectionSkeleton />
      </div>
    );
  }
  console.log(reservationData);
  if (!reservationData) return null;

  return (
    <div className='bg-black-3 flex min-h-dvh flex-col'>
      <NavigationClient />
      <div className='relative flex flex-col'>
        <ProductStatus
          id={reservationId}
          imageUrl={reservationData.productInfo?.imageUrl ?? ''}
          title={reservationData.productInfo?.title ?? ''}
          rate={reservationData.productInfo?.rate ?? 0}
          reviewCount={reservationData.productInfo?.reviewCount ?? 0}
          photographer={reservationData.productInfo?.photographer ?? ''}
          price={reservationData.productInfo?.price ?? 0}
          moods={reservationData.productInfo?.moods ?? []}
          hasReview={!!reservationData.reviewInfo}
        />
        <Divider color='bg-black-3' thickness='large' />
        <ReservationDetail
          status={(reservationData.status as StateCode) ?? 'RESERVATION_REQUESTED'}
          date={reservationData.reservationInfo?.date ?? ''}
          startTime={reservationData.reservationInfo?.startTime ?? ''}
          durationTime={reservationData.reservationInfo?.durationTime ?? 0}
          place={reservationData.reservationInfo?.place ?? ''}
          peopleCount={reservationData.reservationInfo?.peopleCount ?? 0}
          requestNote={reservationData.reservationInfo?.requestNote ?? ''}
          createdAt={reservationData.reservationInfo?.createdAt ?? ''}
        />
        <Divider color='bg-black-3' thickness='large' />
        <Receipt
          basePrice={reservationData.paymentInfo?.basePrice ?? 0}
          extraPrices={reservationData.paymentInfo?.extraPrices ?? []}
          totalPrice={reservationData.paymentInfo?.totalPrice ?? 0}
        />
        <Divider color='bg-black-3' thickness='large' />
        {reservationData.reviewInfo && (
          <ReviewDetail
            id={reservationData.reviewInfo.id ?? 0}
            reviewId={reservationData.reviewInfo.id ?? 0}
            reviewer={reservationData.reviewInfo.reviewer ?? ''}
            rating={reservationData.reviewInfo.rating ?? 0}
            createdAt={reservationData.reviewInfo.createdAt ?? ''}
            images={reservationData.reviewInfo.images ?? []}
            content={reservationData.reviewInfo.content ?? ''}
          />
        )}
      </div>
    </div>
  );
}
