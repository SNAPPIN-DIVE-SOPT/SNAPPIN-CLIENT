'use client';

import { useState } from 'react';

import { ClientNavigation } from './components';
import { PaymentDetail, ReservationDetail, ReservationRequested } from './_section';
import { BottomCTAButton, ConfirmModal, Divider } from '@/ui';
import { STATE_CODES, type StateCode } from '@/types/stateCode';
import { RESERVATION_DETAIL_MOCK } from './mock/reservationDetail.mock';
import { useToast } from '@/ui/toast/hooks/useToast';

type ReservationDetailPageClientProps = {
  reservationId: string;
};

export default function PageClient({ reservationId }: ReservationDetailPageClientProps) {
  const reservationNumericId = Number(reservationId);
  const toast = useToast();

  // TODO: 예약 상세 조회 API 연동 (request에 id 전달)
  const data = RESERVATION_DETAIL_MOCK;

  const [reservationStatus, setReservationStatus] = useState<StateCode>(data.status as StateCode);
  const [isReservationCancelModalOpen, setIsReservationCancelModalOpen] = useState(false);

  // 취소하기 및 문의하기 버튼 노출 조건
  const hasTopActionButtons =
    reservationStatus === STATE_CODES.RESERVATION_REQUESTED ||
    reservationStatus === STATE_CODES.PHOTOGRAPHER_CHECKING;

  const hasPaymentDetailSection = !hasTopActionButtons;

  const handleReservationCancelClick = () => {
    setIsReservationCancelModalOpen(true);
  };

  const handleReservationCancel = () => {
    setReservationStatus(STATE_CODES.RESERVATION_CANCELED);
    setIsReservationCancelModalOpen(false);
  };

  const handlePaymentConfirmClick = () => {
    setReservationStatus(STATE_CODES.PAYMENT_COMPLETED);
  };

  // 하단 버튼 발생 케이스
  const createBottomCtaButton = (status: StateCode) => {
    let bottomCtaButton = null;

    switch (status) {
      case STATE_CODES.PAYMENT_REQUESTED: {
        bottomCtaButton = (
          <BottomCTAButton background='white' hasPadding={true} fixed={true}>
            <BottomCTAButton.Single
              size='large'
              color='primary'
              type='button'
              onClick={handlePaymentConfirmClick}
            >
              결제하고 예약 확정받기
            </BottomCTAButton.Single>
          </BottomCTAButton>
        );
        break;
      }

      case STATE_CODES.PAYMENT_COMPLETED: {
        bottomCtaButton = (
          <BottomCTAButton background='white' hasPadding={true} fixed={true}>
            <BottomCTAButton.Single size='large' type='button' disabled={true}>
              결제 확인중
            </BottomCTAButton.Single>
          </BottomCTAButton>
        );
        break;
      }

      case STATE_CODES.RESERVATION_CANCELED: {
        bottomCtaButton = (
          <BottomCTAButton background='white' hasPadding={true} fixed={true}>
            <BottomCTAButton.Single size='large' color='black' type='button' disabled={true}>
              예약 취소 완료
            </BottomCTAButton.Single>
          </BottomCTAButton>
        );
        break;
      }

      case STATE_CODES.RESERVATION_REFUSED: {
        bottomCtaButton = (
          <BottomCTAButton background='white' hasPadding={true} fixed={true}>
            <BottomCTAButton.Single size='large' color='black' type='button' disabled={true}>
              작가님의 예약 거절
            </BottomCTAButton.Single>
          </BottomCTAButton>
        );
        break;
      }

      case STATE_CODES.RESERVATION_CONFIRMED: {
        bottomCtaButton = null;
        break;
      }

      default: {
        bottomCtaButton = null;
        break;
      }
    }

    return bottomCtaButton;
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
    <div className='bg-black-3 flex min-h-full flex-col'>
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
      {hasPaymentDetailSection ? (
        <>
          <Divider thickness='large' className='h-[0.6rem]' />
          <PaymentDetail paymentInfo={data.paymentInfo} />
        </>
      ) : null}
      {bottomCtaButton && <div className='mt-[5.5rem]'>{bottomCtaButton}</div>}

      <ConfirmModal
        open={isReservationCancelModalOpen}
        handleOpenChange={setIsReservationCancelModalOpen}
        showCloseButton={false}
        title={'예약하신 스냅 일정을\n취소할까요?'}
        buttons={[
          {
            label: '아니요',
            size: 'medium',
            color: 'disabled',
            type: 'button',
          },
          {
            label: '네, 취소할게요',
            size: 'medium',
            color: 'black',
            type: 'button',
            onClick: handleReservationCancel,
          },
        ]}
      />
    </div>
  );
}
