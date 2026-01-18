'use client';

import { useState } from 'react';
import { ClientNavigation, ClientFooter } from './components';
import { PaymentDetail, ReservationDetail, ReservationRequested } from './_section';
import { Divider } from '@/ui';
import { STATE_CODES, type StateCode } from '@/types/stateCode';
import { RESERVATION_DETAIL_MOCK } from './mock/reservationDetail.mock';
import CancelModal from './@modal/(.)cancel-modal/CancelModal';
import { useToast } from '@/ui/toast/hooks/useToast';

type ReservationDetailPageClientProps = {
  reservationId: string;
};

export default function PageClient({ reservationId }: ReservationDetailPageClientProps) {
  const reservationNumericId = Number(reservationId);
  const [cancelOpen, setCancelOpen] = useState(false);

  const toast = useToast();

  // TODO: 예약 상세 조회 API 연동 (request에 id 전달)
  const data = RESERVATION_DETAIL_MOCK;

  const [reservationStatus, setReservationStatus] = useState<StateCode>(data.status as StateCode);

  const hasTopActionButtons =
    reservationStatus === STATE_CODES.RESERVATION_REQUESTED ||
    reservationStatus === STATE_CODES.PHOTOGRAPHER_CHECKING;

  const hasBottomCta =
    reservationStatus === STATE_CODES.PAYMENT_REQUESTED ||
    reservationStatus === STATE_CODES.PAYMENT_COMPLETED ||
    reservationStatus === STATE_CODES.RESERVATION_CANCELED ||
    reservationStatus === STATE_CODES.RESERVATION_REFUSED;

  const hasPaymentDetailSection = !hasTopActionButtons;

  const handleReservationCancelClick = () => {
    setCancelOpen(true);
  };

  const handleReservationCancel = () => {
    setReservationStatus(STATE_CODES.RESERVATION_CANCELED);
    setCancelOpen(false);
  };

  const handlePaymentConfirmClick = () => {
    setReservationStatus(STATE_CODES.PAYMENT_COMPLETED);
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
          reservationId={reservationNumericId}
          reservationStatus={reservationStatus}
          productInfo={{
            ...data.productInfo,
            moods: data.productInfo.moods,
          }}
          handleReservationCancelClick={handleReservationCancelClick}
          handleInquiryClick={handleInquiryClick}
        />
        <Divider thickness='large' className='h-[0.6rem]' />
        <ReservationDetail
          reservationStatus={reservationStatus}
          reservationInfo={data.reservationInfo}
        />
        {hasPaymentDetailSection && (
          <>
            <Divider thickness='large' className='h-[0.6rem]' />
            <PaymentDetail paymentInfo={data.paymentInfo} />
          </>
        )}
        {hasBottomCta && (
          <>
            <div className='h-[8.4rem]' />
            <ClientFooter
              status={reservationStatus}
              handlePaymentConfirmClick={handlePaymentConfirmClick}
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
