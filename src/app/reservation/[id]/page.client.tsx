'use client';

import { ClientNavigation, ClientFooter } from './components';
import { PaymentDetail, ReservationDetail, ReservationProduct, ReviewDetail } from './_section';
import { Divider } from '@/ui';
import { STATE_CODES, type StateCode } from '@/types/stateCode';
import CancelModal from './@modal/(.)cancel-modal/CancelModal';
import { useGetReservationDetail } from './api';
import SectionSkeleton from '@/components/layout/reservation/SectionSkeleton';
import { useReservationActions } from './hooks/useReservationActions';

type ReservationDetailPageClientProps = {
  reservationId: number;
};

export default function PageClient({ reservationId }: ReservationDetailPageClientProps) {
  const { data: reservationData, isPending } = useGetReservationDetail(reservationId);

  const status = reservationData?.status as StateCode;

  // 촬영 완료
  const isPhotoFinal = status === STATE_CODES.SHOOT_COMPLETED;

  const {
    cancelOpen,
    setCancelOpen,
    canceledPreviousStatus,
    handleReservationCancelClick,
    handleReservationCancel,
    handleInquiryClick,
    clientFooterConfig,
  } = useReservationActions({
    reservationId,
    status,
  });

  // 예약 취소 시 결제 상세 노출되는 조건
  const hasCanceledWithPayment =
    status === STATE_CODES.RESERVATION_CANCELED &&
    (canceledPreviousStatus === STATE_CODES.PAYMENT_REQUESTED ||
      canceledPreviousStatus === STATE_CODES.PAYMENT_COMPLETED);

  // 결제 상세 노출 조건
  const hasPaymentDetailSection =
    status === STATE_CODES.PAYMENT_REQUESTED ||
    status === STATE_CODES.PAYMENT_COMPLETED ||
    status === STATE_CODES.RESERVATION_CONFIRMED ||
    hasCanceledWithPayment;

  if (isPending) {
    return (
      <div className='bg-black-1 flex min-h-dvh flex-col'>
        <ClientNavigation title={isPhotoFinal ? '촬영 내역' : '예약 상세'} />
        <SectionSkeleton />
      </div>
    );
  }

  return (
    <>
      <div className='bg-black-1 flex flex-col'>
        <ClientNavigation title={isPhotoFinal ? '촬영 내역' : '예약 상세'} />
        <ReservationProduct
          id={reservationId}
          reservationStatus={status}
          imageUrl={reservationData?.productInfo?.imageUrl ?? ''}
          title={reservationData?.productInfo?.title ?? ''}
          rate={reservationData?.productInfo?.rate ?? 0}
          reviewCount={reservationData?.productInfo?.reviewCount ?? 0}
          photographer={reservationData?.productInfo?.photographer ?? ''}
          price={reservationData?.productInfo?.price ?? 0}
          moods={reservationData?.productInfo?.moods ?? []}
          hasReview={!!reservationData?.reviewInfo}
          handleReservationCancelClick={handleReservationCancelClick}
          handleInquiryClick={handleInquiryClick}
        />
        <Divider thickness='large' className='h-[0.6rem]' />
        <ReservationDetail
          status={status}
          date={reservationData?.reservationInfo?.date ?? ''}
          startTime={reservationData?.reservationInfo?.startTime ?? ''}
          durationTime={reservationData?.reservationInfo?.durationTime ?? 0}
          place={reservationData?.reservationInfo?.place ?? ''}
          peopleCount={reservationData?.reservationInfo?.peopleCount ?? 0}
          requestNote={reservationData?.reservationInfo?.requestNote ?? ''}
          createdAt={reservationData?.reservationInfo?.createdAt ?? ''}
        />

        {(hasPaymentDetailSection || isPhotoFinal) && (
          <>
            <Divider thickness='large' className='h-[0.6rem]' />
            <PaymentDetail
              basePrice={reservationData?.paymentInfo?.basePrice ?? 0}
              extraPrices={reservationData?.paymentInfo?.extraPrices ?? []}
              totalPrice={reservationData?.paymentInfo?.totalPrice ?? 0}
            />
          </>
        )}

        {reservationData?.reviewInfo && (
          <>
            <Divider color='bg-black-3' thickness='large' />
            <ReviewDetail
              id={reservationData.reviewInfo.id ?? 0}
              reviewer={reservationData.reviewInfo.reviewer ?? ''}
              rating={reservationData.reviewInfo.rating ?? 0}
              createdAt={reservationData.reviewInfo.createdAt ?? ''}
              images={reservationData.reviewInfo.images ?? []}
              content={reservationData.reviewInfo.content ?? ''}
            />
          </>
        )}

        {clientFooterConfig && <ClientFooter config={clientFooterConfig} />}
      </div>

      <CancelModal
        open={cancelOpen}
        handleOpenChange={setCancelOpen}
        handleReservationCancel={handleReservationCancel}
      />
    </>
  );
}
