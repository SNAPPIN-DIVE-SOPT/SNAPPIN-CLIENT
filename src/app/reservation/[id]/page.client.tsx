'use client';

import { useState } from 'react';
import { ClientNavigation, ClientFooter } from './components';
import { PaymentDetail, ReservationDetail, ReservationProduct, ReviewDetail } from './_section';
import { Divider } from '@/ui';
import { STATE_CODES, type StateCode } from '@/types/stateCode';
import CancelModal from './@modal/(.)cancel-modal/CancelModal';
import { useToast } from '@/ui/toast/hooks/useToast';
import { useGetReservationDetail, useCancelReservation, useRequestPayment } from './api';
import SectionSkeleton from '@/components/layout/reservation/SectionSkeleton';

type ReservationDetailPageClientProps = {
  reservationId: string;
};

export default function PageClient({ reservationId }: ReservationDetailPageClientProps) {
  const parsedReservationId = Number(reservationId);

  const { data: reservationData, isPending } = useGetReservationDetail(parsedReservationId);

  const { mutate: cancelReservationMutation } = useCancelReservation(parsedReservationId);
  const { mutate: requestPaymentMutation, isPending: isPaymentRequestPending } =
    useRequestPayment(parsedReservationId);

  const [cancelOpen, setCancelOpen] = useState(false);

  const toast = useToast();

  const handleReservationCancelClick = () => {
    setCancelOpen(true);
  };

  const handleReservationCancel = () => {
    cancelReservationMutation(parsedReservationId, {
      onSuccess: () => {
        setCancelOpen(false);
      },
      onError: () => {
        toast.error(
          '예약 취소 중 오류가 발생했습니다. 다시 시도해주세요.',
          undefined,
          'bottom-[8rem]',
        );
      },
    });
  };

  const handlePaymentConfirmClick = () => {
    if (isPaymentRequestPending) return;

    requestPaymentMutation(parsedReservationId, {
      onError: () => {
        toast.error(
          '결제 요청 중 오류가 발생했습니다. 다시 시도해주세요.',
          undefined,
          'bottom-[8rem]',
        );
      },
    });
  };

  const handleInquiryClick = () => {
    toast.alert(
      '메시지 기능은 준비 중이에요. 조금만 기다려주세요!',
      undefined,
      hasBottomCta ? 'bottom-[8.4rem]' : 'bottom-[2rem]',
    );
  };

  const status = reservationData?.status as StateCode;
  const isPhotoFinal = status === STATE_CODES.SHOOT_COMPLETED;

  const hasPaymentInfo = reservationData?.paymentInfo !== undefined;

  const hasPaymentDetailSection =
    status === STATE_CODES.PAYMENT_REQUESTED ||
    status === STATE_CODES.PAYMENT_COMPLETED ||
    (status === STATE_CODES.RESERVATION_CANCELED && hasPaymentInfo);

  const hasBottomCta =
    status === STATE_CODES.PAYMENT_REQUESTED ||
    status === STATE_CODES.PAYMENT_COMPLETED ||
    status === STATE_CODES.RESERVATION_CANCELED ||
    status === STATE_CODES.RESERVATION_REFUSED;

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
          id={parsedReservationId}
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

        {hasBottomCta && (
          <>
            <div className='h-[8.4rem]' />

            <ClientFooter
              status={status}
              handlePaymentConfirmClick={handlePaymentConfirmClick}
              isPaymentRequestPending={isPaymentRequestPending}
            />
          </>
        )}
      </div>

      <CancelModal
        open={cancelOpen}
        handleOpenChange={setCancelOpen}
        handleReservationCancel={handleReservationCancel}
      />
    </>
  );
}
