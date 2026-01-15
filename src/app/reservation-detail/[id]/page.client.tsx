'use client';

import { useState } from 'react';
import { ClientNavigation } from './components';
import { PaymentDetail, ReservationDetail, ReservationRequested } from './_section';
import { BottomCTAButton, Divider } from '@/ui';
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

  // 취소하기 및 문의하기 버튼 노출 조건
  const hasTopActionButtons =
    reservationStatus === STATE_CODES.RESERVATION_REQUESTED ||
    reservationStatus === STATE_CODES.PHOTOGRAPHER_CHECKING;

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

  const BOTTOM_CTA_CONFIG: Partial<
    Record<
      StateCode,
      {
        label: string;
        color?: 'primary' | 'black';
        disabled?: boolean;
        onClick?: () => void;
      } | null
    >
  > = {
    [STATE_CODES.PAYMENT_REQUESTED]: {
      label: '결제하고 예약 확정받기',
      color: 'primary',
      onClick: handlePaymentConfirmClick,
    },

    [STATE_CODES.PAYMENT_COMPLETED]: {
      label: '결제 확인중',
      disabled: true,
    },

    [STATE_CODES.RESERVATION_CANCELED]: {
      label: '예약 취소 완료',
      color: 'black',
      disabled: true,
    },

    [STATE_CODES.RESERVATION_REFUSED]: {
      label: '작가님의 예약 거절',
      color: 'black',
      disabled: true,
    },

    [STATE_CODES.RESERVATION_CONFIRMED]: null,
  };

  const createBottomCtaButton = (status: StateCode) => {
    const config = BOTTOM_CTA_CONFIG[status];
    if (!config) return null;

    const { label, color, disabled, onClick } = config;

    return (
      <BottomCTAButton background='white' hasPadding fixed>
        <BottomCTAButton.Single
          size='large'
          type='button'
          color={color}
          disabled={disabled}
          onClick={onClick}
        >
          {label}
        </BottomCTAButton.Single>
      </BottomCTAButton>
    );
  };

  const bottomCtaButton = createBottomCtaButton(reservationStatus);

  const handleInquiryClick = () => {
    toast.alert(
      '메시지 기능은 준비 중이에요. 조금만 기다려주세요!',
      undefined,
      bottomCtaButton ? 'bottom-[8.4rem]' : 'bottom-[2rem]',
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
        {bottomCtaButton && <div className='mt-[5.5rem]'>{bottomCtaButton}</div>}
      </div>
      <CancelModal
        open={cancelOpen}
        handleOpenChange={setCancelOpen}
        handleReservationCancel={handleReservationCancel}
      />
    </>
  );
}
