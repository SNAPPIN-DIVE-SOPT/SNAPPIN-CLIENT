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
import { ACCESS_TOKEN_COOKIE_NAME } from '@/auth/constant/cookie';
import { useAuth } from '@/auth/hooks/useAuth';
import { useGetReservationDetail } from './api';

type ReservationDetailPageClientProps = {
  reservationId: string;
};

export default function PageClient({ reservationId }: ReservationDetailPageClientProps) {
  const hasAccessToken =
    typeof document !== 'undefined' && document.cookie.includes(`${ACCESS_TOKEN_COOKIE_NAME}=`);
  const { isLogIn } = useAuth();

  const { data: reservationData } = useGetReservationDetail(
    Number(reservationId),
    hasAccessToken && isLogIn === true,
  );

  const [cancelOpen, setCancelOpen] = useState(false);

  const toast = useToast();

  // TODO: 예약 상태 변경 API 연동 후 상태 관리 로직 수정 필요
  const [reservationStatus, setReservationStatus] = useState<StateCode>(
    reservationData?.status as StateCode,
  );

  const normalizeStatus = (status?: string): StateCode => {
    const code = status as StateCode;
    const hasTheme = code in STATE_CHIP_THEME_BY_LABEL;
    const hasLabel = code in STATE_LABEL;
    return hasTheme && hasLabel ? code : STATE_CODES.RESERVATION_REQUESTED;
  };

  const status = normalizeStatus(reservationData?.status);

  const hasTopActionButtons =
    status === STATE_CODES.RESERVATION_REQUESTED || status === STATE_CODES.PHOTOGRAPHER_CHECKING;

  const hasBottomCta =
    status === STATE_CODES.PAYMENT_REQUESTED ||
    status === STATE_CODES.PAYMENT_COMPLETED ||
    status === STATE_CODES.RESERVATION_CANCELED ||
    status === STATE_CODES.RESERVATION_REFUSED;

  const hasPaymentDetailSection = !hasTopActionButtons;

  const handleReservationCancelClick = () => {
    setCancelOpen(true);
  };

  const handleReservationCancel = () => {
    setReservationStatus(STATE_CODES.RESERVATION_CANCELED);
    setCancelOpen(false);
    // TODO: API 호출 로직 추가
  };

  const handlePaymentConfirmClick = () => {
    setReservationStatus(STATE_CODES.PAYMENT_COMPLETED);
    // TODO: API 호출 로직 추가
  };

  const handleInquiryClick = () => {
    toast.alert(
      '메시지 기능은 준비 중이에요. 조금만 기다려주세요!',
      undefined,
      hasBottomCta ? 'bottom-[8.4rem]' : 'bottom-[2rem]',
    );
  };

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
