'use client';

import {
  ProductStatus,
  ReservationDetail,
  Receipt,
  ReviewDetail,
  DetailPageFooter,
  SectionSkeleton,
} from './_section';
import { STATE_CODES, StateCode } from '@/types/stateCode';
import { Divider } from '@/ui';
import { useGetReservationDetail } from './api';

type PageClientProps = {
  id: string;
};

export default function PageClient({ id }: PageClientProps) {
  const reservationId = Number(id);
  const { data, isPending } = useGetReservationDetail(reservationId);

  if (isPending) {
    return <SectionSkeleton />;
  }

  return (
    <div className='flex flex-col'>
      <ProductStatus
        reservationId={reservationId}
        status={(data?.status as StateCode) ?? ''}
        imageUrl={data?.productInfo?.imageUrl ?? ''}
        title={data?.productInfo?.title ?? ''}
        rate={data?.productInfo?.rate ?? 0}
        reviewCount={data?.productInfo?.reviewCount ?? 0}
        photographer={data?.productInfo?.photographer ?? ''}
        price={data?.productInfo?.price ?? 0}
        moods={data?.productInfo?.moods ?? []}
      />
      <Divider thickness='large' color='bg-black-3' />
      <ReservationDetail
        client={data?.reservationInfo?.client ?? ''}
        createdAt={data?.reservationInfo?.createdAt ?? ''}
        status={(data?.status as StateCode) ?? ''}
        date={data?.reservationInfo?.date ?? ''}
        startTime={data?.reservationInfo?.startTime ?? ''}
        durationTime={data?.reservationInfo?.durationTime ?? 0}
        place={data?.reservationInfo?.place ?? ''}
        peopleCount={data?.reservationInfo?.peopleCount ?? 0}
        requestNote={data?.reservationInfo?.requestNote ?? ''}
      />
      {data?.paymentInfo && data?.status !== STATE_CODES.PHOTOGRAPHER_CHECKING && (
        <>
          <Divider thickness='large' color='bg-black-3' />
          <Receipt
            basePrice={data?.paymentInfo?.basePrice ?? 0}
            extraPrice={data?.paymentInfo?.extraPrices ?? []}
            totalPrice={data?.paymentInfo?.totalPrice ?? 0}
          />
        </>
      )}
      {data?.reviewInfo ? (
        <>
          <Divider thickness='large' color='bg-black-3' />
          <ReviewDetail
            reservationId={reservationId}
            id={data?.reviewInfo?.id ?? -1}
            reviewer={data?.reviewInfo?.reviewer ?? ''}
            rating={data?.reviewInfo?.rating ?? 0}
            createdAt={data?.reviewInfo?.createdAt ?? ''}
            images={data?.reviewInfo?.images ?? []}
            content={data?.reviewInfo?.content ?? ''}
          />
          <div className='h-[6.3rem]' />
        </>
      ) : (
        <>
          <DetailPageFooter
            reservationId={reservationId}
            date={data?.reservationInfo?.date ?? ''}
            startTime={data?.reservationInfo?.startTime ?? ''}
            status={(data?.status as StateCode) ?? ''}
          />
          <div className='bg-black-1 h-[6.3rem]' />
        </>
      )}
    </div>
  );
}
