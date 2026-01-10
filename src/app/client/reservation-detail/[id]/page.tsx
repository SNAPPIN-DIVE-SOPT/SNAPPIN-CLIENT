'use client';

import { use } from 'react';
import { useAtom } from 'jotai';

import { PaymentDetail, ReservationDetail, ReservationRequested } from './_section';
import { HeaderNavigation } from './components';
import { BottomCTAButton, Divider } from '@/ui';
import { getReservationDetailMockById } from './mock/reservationDetail.mock';
import type { StateCode } from '@/types/stateCode';
import { ReservationStatusByReservationProductIdAtom } from '@/app/client/(with-layout)/reservation/store';

type ReservationDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function Page({ params }: ReservationDetailPageProps) {
  const { id } = use(params);
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
    // TODO: 문의하기 이동
  };

  const handleReviewCreateClick = () => {
    // TODO: 리뷰 작성 이동
  };

  const hasPaymentRequestAction = reservationStatus === 'PAYMENT_REQUESTED';
  const hasPaymentConfirmingAction = reservationStatus === 'PAYMENT_COMPLETED';
  const hasReservationCanceledAction = reservationStatus === 'RESERVATION_CANCELED';
  const hasShootCompletedAction = reservationStatus === 'SHOOT_COMPLETED';
  const hasPaymentDetailSection =
    hasPaymentRequestAction || hasPaymentConfirmingAction || hasShootCompletedAction;

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
        작가님의 예약 거절
      </BottomCTAButton.Single>
    </BottomCTAButton>
  ) : null;

  return (
    <div className='bg-black-3 flex min-h-full flex-col'>
      <HeaderNavigation />
      <Divider color='bg-black-5' />
      <ReservationRequested
        reservationProductId={resolvedReservationProductId}
        reservationStatus={reservationStatus}
        handleReservationCancelClick={handleReservationCancelClick}
        handleInquiryClick={handleInquiryClick}
        handleReviewCreateClick={handleReviewCreateClick}
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
