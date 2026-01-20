'use client';

import { useState } from 'react';
import { ClientNavigation, ClientFooter } from './components';
import { PaymentDetail, ReservationDetail, ReservationRequested } from './_section';
import { Divider } from '@/ui';
import { STATE_CHIP_THEME_BY_LABEL } from '@/ui/chip/state-chip/constants/stateChipTheme';
import { STATE_LABEL } from '@/ui/chip/state-chip/constants/stateLabel';
import { STATE_CODES, type StateCode } from '@/types/stateCode';
import CancelModal from './@modal/(.)cancel-modal/CancelModal';
import { useToast } from '@/ui/toast/hooks/useToast';
import { useAuth } from '@/auth/hooks/useAuth';
import { useGetReservationDetail, useCancelReservation, useRequestPayment } from './api';
import SectionSkeleton from './_section/SectionSkeleton';

type ReservationDetailPageClientProps = {
  reservationId: string;
};

export default function PageClient({ reservationId }: ReservationDetailPageClientProps) {
  const { isLogIn } = useAuth();

  const { data: reservationData, isPending } = useGetReservationDetail(
    Number(reservationId),
    isLogIn === true,
  );

  const { mutate: cancelReservationMutation } = useCancelReservation();
  const { mutate: requestPaymentMutation } = useRequestPayment();

  const [cancelOpen, setCancelOpen] = useState(false);
  const [reservationStatus, setReservationStatus] = useState<StateCode>();
  const [previousStatus, setPreviousStatus] = useState<StateCode>();

  const toast = useToast();

  const normalizeStatus = (status?: string): StateCode => {
    const code = status as StateCode;
    const hasTheme = code in STATE_CHIP_THEME_BY_LABEL;
    const hasLabel = code in STATE_LABEL;
    return hasTheme && hasLabel ? code : STATE_CODES.RESERVATION_REQUESTED;
  };

  const status = normalizeStatus(reservationStatus ?? reservationData?.status);

  const previousComputedStatus =
    previousStatus ?? (reservationData?.status as StateCode | undefined);

  // 이전 상태가 예약 요청 또는 작가 확인일 때 취소된 상태인지 확인
  const isCanceledFrom =
    status === STATE_CODES.RESERVATION_CANCELED &&
    (previousComputedStatus === STATE_CODES.RESERVATION_REQUESTED ||
      previousComputedStatus === STATE_CODES.PHOTOGRAPHER_CHECKING);

  const hasTopActionButtons =
    status === STATE_CODES.RESERVATION_REQUESTED || status === STATE_CODES.PHOTOGRAPHER_CHECKING;

  const hasBottomCta =
    status === STATE_CODES.PAYMENT_REQUESTED ||
    status === STATE_CODES.PAYMENT_COMPLETED ||
    status === STATE_CODES.RESERVATION_CANCELED ||
    status === STATE_CODES.RESERVATION_REFUSED;

  const hasPaymentDetailSection = !hasTopActionButtons && !isCanceledFrom;

  const handleReservationCancelClick = () => {
    setCancelOpen(true);
  };

  const handleReservationCancel = () => {
    cancelReservationMutation(Number(reservationId), {
      onSuccess: (cancelResponse) => {
        setPreviousStatus(status);
        setReservationStatus(cancelResponse.status as StateCode);
        setCancelOpen(false);
      },
      onError: () => {
        toast.error('예약 취소 중 오류가 발생했습니다. 다시 시도해주세요.');
      },
    });
  };

  const handlePaymentConfirmClick = () => {
    requestPaymentMutation(Number(reservationId), {
      onSuccess: (paymentResponse) => {
        setPreviousStatus(status);
        setReservationStatus(paymentResponse.status as StateCode);
      },
      onError: () => {
        toast.error('결제 요청 중 오류가 발생했습니다. 다시 시도해주세요.');
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

  if (isPending) {
    return (
      <div className='bg-black-1 flex min-h-dvh flex-col'>
        <ClientNavigation title='예약 상세' />
        <SectionSkeleton />
      </div>
    );
  }

  return (
    <>
      <div className='bg-black-1 flex flex-col'>
        <ClientNavigation title='예약 상세' />
        <ReservationRequested
          reservationStatus={status}
          imageUrl={reservationData?.productInfo?.imageUrl ?? ''}
          title={reservationData?.productInfo?.title ?? ''}
          rate={reservationData?.productInfo?.rate ?? 0}
          reviewCount={reservationData?.productInfo?.reviewCount ?? 0}
          photographer={reservationData?.productInfo?.photographer ?? ''}
          price={reservationData?.productInfo?.price ?? 0}
          moods={reservationData?.productInfo?.moods ?? []}
          handleReservationCancelClick={handleReservationCancelClick}
          handleInquiryClick={handleInquiryClick}
        />
        <Divider thickness='large' className='h-[0.6rem]' />
        <ReservationDetail
          status={status as StateCode}
          date={reservationData?.reservationInfo?.date ?? ''}
          startTime={reservationData?.reservationInfo?.startTime ?? ''}
          durationTime={reservationData?.reservationInfo?.durationTime ?? 0}
          place={reservationData?.reservationInfo?.place ?? ''}
          peopleCount={reservationData?.reservationInfo?.peopleCount ?? 0}
          requestNote={reservationData?.reservationInfo?.requestNote ?? ''}
          createdAt={reservationData?.reservationInfo?.createdAt ?? ''}
        />
        {hasPaymentDetailSection && (
          <>
            <Divider thickness='large' className='h-[0.6rem]' />
            <PaymentDetail
              basePrice={reservationData?.paymentInfo?.basePrice ?? 0}
              extraPrices={reservationData?.paymentInfo?.extraPrices ?? []}
              totalPrice={reservationData?.paymentInfo?.totalPrice ?? 0}
            />
          </>
        )}
        {hasBottomCta && (
          <>
            <div className='h-[8.4rem]' />
            <ClientFooter status={status} handlePaymentConfirmClick={handlePaymentConfirmClick} />
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
