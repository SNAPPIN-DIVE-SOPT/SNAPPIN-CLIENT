'use client';

import {
  ProductStatus,
  ReservationDetail,
  Receipt,
  ReviewDetail,
  DetailPageFooter,
} from './_section';
import { STATE_CODES, StateCode } from '@/types/stateCode';
import { Divider } from '@/ui';
import { useGetReservationDetail } from './api';
import SectionSkeleton from '@/components/layout/reservation/SectionSkeleton';

type PageClientProps = {
  id: string;
};

export default function PageClient({ id }: PageClientProps) {
  const reservationId = Number(id);
  const { data, isPending } = useGetReservationDetail(reservationId);

  const productInfo = data?.productInfo;
  const reservationInfo = data?.reservationInfo;
  const paymentInfo = data?.paymentInfo;
  const reviewInfo = data?.reviewInfo;
  const status = data?.status as StateCode;

  const shouldShowReceipt = status !== STATE_CODES.PHOTOGRAPHER_CHECKING;

  if (isPending) {
    return <SectionSkeleton />;
  }

  return (
    <div className='flex flex-col'>
      <ProductStatus
        reservationId={reservationId}
        status={status}
        imageUrl={productInfo?.imageUrl ?? ''}
        title={productInfo?.title ?? ''}
        rate={productInfo?.rate ?? 0}
        reviewCount={productInfo?.reviewCount ?? 0}
        photographer={productInfo?.photographer ?? ''}
        price={productInfo?.price ?? 0}
        moods={productInfo?.moods ?? []}
      />
      <Divider thickness='large' color='bg-black-3' />
      <ReservationDetail
        client={reservationInfo?.client ?? ''}
        createdAt={reservationInfo?.createdAt ?? ''}
        status={status}
        date={reservationInfo?.date ?? ''}
        startTime={reservationInfo?.startTime ?? ''}
        durationTime={reservationInfo?.durationTime ?? 0}
        place={reservationInfo?.place ?? ''}
        peopleCount={reservationInfo?.peopleCount ?? 0}
        requestNote={reservationInfo?.requestNote ?? ''}
      />
      {shouldShowReceipt && (
        <>
          <Divider thickness='large' color='bg-black-3' />
          <Receipt
            basePrice={paymentInfo?.basePrice ?? 0}
            extraPrice={paymentInfo?.extraPrices ?? []}
            totalPrice={paymentInfo?.totalPrice ?? 0}
          />
        </>
      )}
      {reviewInfo ? (
        <>
          <Divider thickness='large' color='bg-black-3' />
          <ReviewDetail
            id={reviewInfo.id ?? 0}
            reviewer={reviewInfo.reviewer ?? ''}
            rating={reviewInfo.rating ?? 0}
            createdAt={reviewInfo.createdAt ?? ''}
            images={reviewInfo.images ?? []}
            content={reviewInfo.content ?? ''}
          />
        </>
      ) : (
        <DetailPageFooter
          reservationId={reservationId}
          date={reservationInfo?.date ?? ''}
          status={status}
        />
      )}
    </div>
  );
}
