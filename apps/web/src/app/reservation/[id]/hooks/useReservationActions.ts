import { useState } from 'react';
import { useToast } from '@/ui';
import { STATE_CODES, type StateCode } from '@snappin/shared/types';
import { useCancelReservation, useRequestPayment } from '../api';
import { type ClientFooterConfig } from '@/app/reservation/[id]/components';

type UseReservationActionsProps = {
  reservationId: number;
  status: StateCode;
};

export const useReservationActions = ({ reservationId, status }: UseReservationActionsProps) => {
  const [cancelOpen, setCancelOpen] = useState(false);
  const [canceledPreviousStatus, setCanceledPreviousStatus] = useState<StateCode>();
  const toast = useToast();

  const { mutate: cancelReservationMutation } = useCancelReservation(reservationId);
  const { mutate: requestPaymentMutation, isPending: isPaymentRequestPending } =
    useRequestPayment(reservationId);

  // 예약 취소 버튼 클릭
  const handleReservationCancelClick = () => setCancelOpen(true);

  // 모달에서 예약 취소 버튼 클릭
  const handleReservationCancel = () => {
    cancelReservationMutation(reservationId, {
      onSuccess: (cancelResponse) => {
        setCanceledPreviousStatus(cancelResponse.previousStatus as StateCode | undefined);
        setCancelOpen(false);
      },
      onError: () =>
        toast.error(
          '예약 취소 중 오류가 발생했습니다. 다시 시도해주세요.',
          'bottom-[8rem]',
        ),
    });
  };

  // 결제 요청 버튼 클릭
  const handlePaymentConfirmClick = () => {
    if (isPaymentRequestPending) return;

    requestPaymentMutation(reservationId, {
      onError: () =>
        toast.error(
          '결제 요청 중 오류가 발생했습니다. 다시 시도해주세요.',
          'bottom-[8.4rem]',
        ),
    });
  };

  const clientFooterConfig: ClientFooterConfig | null = (() => {
    switch (status) {
      case STATE_CODES.PAYMENT_REQUESTED:
        return {
          label: '결제하고 예약 확정받기',
          color: 'primary',
          disabled: isPaymentRequestPending,
          onClick: handlePaymentConfirmClick,
        };

      case STATE_CODES.PAYMENT_COMPLETED:
        return {
          label: '결제 확인중',
          disabled: true,
        };

      case STATE_CODES.RESERVATION_CANCELED:
        return {
          label: '예약 취소 완료',
          color: 'black',
          disabled: true,
        };

      case STATE_CODES.RESERVATION_REFUSED:
        return {
          label: '작가님의 예약 거절',
          color: 'black',
          disabled: true,
        };

      default:
        return null;
    }
  })();

  // 문의 버튼 클릭
  const handleInquiryClick = () => {
    const hasBottomCta = clientFooterConfig !== null;

    toast.alert(
      '메시지 기능은 준비 중이에요. 조금만 기다려주세요!',
      hasBottomCta ? 'bottom-[8.4rem]' : 'bottom-[2rem]',
    );
  };

  return {
    cancelOpen,
    setCancelOpen,
    canceledPreviousStatus,
    handleReservationCancelClick,
    handleReservationCancel,
    handleInquiryClick,
    clientFooterConfig,
  };
};
