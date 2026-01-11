'use client';

import { use } from 'react';
import { useAtom } from 'jotai';

import { PaymentDetail, ReservationDetail, ReservationRequested } from './_section';
import { HeaderNavigation } from './components';
import { BottomCTAButton, Divider } from '@/ui';
import { getReservationDetailMockById } from './mock/reservationDetail.mock';
import type { StateCode } from '@/types/stateCode';
import { ReservationStatusByReservationProductIdAtom } from '@/app/client/(with-layout)/reservation/store';
import { useNavVisibility } from '@/app/(with-layout)/(home)/hooks/useNavVisibility';
import { useToast } from '@/ui/toast/hooks/useToast';

type ReservationDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function Page({ params }: ReservationDetailPageProps) {
  const { id } = use(params);
  const { isVisible } = useNavVisibility();
  const toast = useToast();
  const reservationProductId = Number(id);
  const resolvedReservationProductId = Number.isNaN(reservationProductId)
    ? 1
    : reservationProductId;
  const reservationDetailMock = getReservationDetailMockById(resolvedReservationProductId);
  const [reservationStatusByReservationProductId, setReservationStatusByReservationProductId] =
    useAtom(ReservationStatusByReservationProductIdAtom);
  const reservationStatus =
    reservationStatusByReservationProductId[resolvedReservationProductId] ??
    reservationDetailMock.status;

  const handleReservationStatusChange = (nextReservationStatus: StateCode) => {
    setReservationStatusByReservationProductId(
      (previousReservationStatusByReservationProductId) => ({
        ...previousReservationStatusByReservationProductId,
        [resolvedReservationProductId]: nextReservationStatus,
      }),
    );
  };

  const handleReservationCancelClick = () => {
    // TODO: 모달 삽입 (예약 취소 확인) / confirm 시 아래 상태로 변경
    handleReservationStatusChange('RESERVATION_CANCELED');
  };

  const handlePaymentConfirmClick = () => {
    // TODO: 모달 삽입 (결제 확정) / confirm 시 아래 상태로 변경
    handleReservationStatusChange('PAYMENT_COMPLETED');
  };

  const handleInquiryClick = () => {
    toast.error('작가님이 아직 채팅방을 운영하지 않아요.');
  };

  const hasPaymentRequestAction = reservationStatus === 'PAYMENT_REQUESTED';
  const hasPaymentConfirmingAction = reservationStatus === 'PAYMENT_COMPLETED';
  const hasReservationConfirmedAction = reservationStatus === 'RESERVATION_CONFIRMED';
  const hasReservationRefusedAction = reservationStatus === 'RESERVATION_REFUSED';
  const hasReservationCanceledAction = reservationStatus === 'RESERVATION_CANCELED';
  const hasPaymentDetailSection =
    hasPaymentRequestAction || hasPaymentConfirmingAction || hasReservationConfirmedAction;

  const bottomCtaButton = hasPaymentRequestAction ? (
    <BottomCTAButton background='white' hasPadding={true}>
      <BottomCTAButton.Single
        size='large'
        color='primary'
        type='button'
        onClick={handlePaymentConfirmClick}
      >
        결제하고 예약 확정받기
      </BottomCTAButton.Single>
    </BottomCTAButton>
  ) : hasPaymentConfirmingAction ? (
    <BottomCTAButton background='white' hasPadding={true}>
      <BottomCTAButton.Single size='large' type='button' disabled={true}>
        결제 확인중
      </BottomCTAButton.Single>
    </BottomCTAButton>
	  ) : hasReservationCanceledAction ? (
	    <BottomCTAButton background='white' hasPadding={true}>
	      <BottomCTAButton.Single size='large' color='black' type='button' disabled={true}>
	        예약 취소 완료
	      </BottomCTAButton.Single>
	    </BottomCTAButton>
	  ) : hasReservationRefusedAction ? (
	    <BottomCTAButton background='white' hasPadding={true}>
	      <BottomCTAButton.Single size='large' color='black' type='button' disabled={true}>
	        작가님의 예약 거절
	      </BottomCTAButton.Single>
	    </BottomCTAButton>
	  ) : null;

  return (
    <div className='bg-black-3 flex min-h-full flex-col'>
      <HeaderNavigation isVisible={isVisible} />
      <Divider color='bg-black-5' />
      <ReservationRequested
        reservationProductId={resolvedReservationProductId}
        reservationStatus={reservationStatus}
        handleReservationCancelClick={handleReservationCancelClick}
        handleInquiryClick={handleInquiryClick}
      />
      <Divider thickness='large' />
      <ReservationDetail
        reservationStatus={reservationStatus}
        reservationInfo={reservationDetailMock.reservationInfo}
      />
      {hasPaymentDetailSection ? (
        <>
          <Divider thickness='large' />
          <PaymentDetail paymentInfo={reservationDetailMock.paymentInfo} />
        </>
      ) : null}
      {bottomCtaButton}
    </div>
  );
}
