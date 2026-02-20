import { useState } from 'react';
import { useToast } from '@/ui/toast/hooks/useToast';
import { useCancelReservation, useRequestPayment } from '../api';
import { type StateCode } from '@/types/stateCode';

type UseReservationActionsProps = {
  reservationId: number;
};

export const useReservationActions = ({ reservationId }: UseReservationActionsProps) => {
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
          undefined,
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
          undefined,
          'bottom-[8.4rem]',
        ),
    });
  };

  // 문의 버튼 클릭
  const handleInquiryClick = (hasBottomCta: boolean) => {
    toast.alert(
      '메시지 기능은 준비 중이에요. 조금만 기다려주세요!',
      undefined,
      hasBottomCta ? 'bottom-[8.4rem]' : 'bottom-[2rem]',
    );
  };

  return {
    cancelOpen,
    setCancelOpen,
    canceledPreviousStatus,
    isPaymentRequestPending,
    handleReservationCancelClick,
    handleReservationCancel,
    handlePaymentConfirmClick,
    handleInquiryClick,
  };
};
