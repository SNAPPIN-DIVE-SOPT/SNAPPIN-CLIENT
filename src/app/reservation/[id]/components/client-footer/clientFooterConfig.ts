import { STATE_CODES, type StateCode } from '@/types/stateCode';

export type ClientFooterConfig = {
  label: string;
  color?: 'primary' | 'black';
  disabled?: boolean;
  onClick?: () => void;
};

type GetClientFooterConfigProps = {
  status: StateCode;
  isPaymentRequestPending: boolean;
  handlePaymentConfirmClick: () => void;
};

export const getClientFooterConfig = ({
  status,
  isPaymentRequestPending,
  handlePaymentConfirmClick,
}: GetClientFooterConfigProps): ClientFooterConfig | null => {
  if (status === STATE_CODES.PAYMENT_REQUESTED) {
    return {
      label: '결제하고 예약 확정받기',
      color: 'primary',
      disabled: isPaymentRequestPending,
      onClick: handlePaymentConfirmClick,
    };
  }

  if (status === STATE_CODES.PAYMENT_COMPLETED) {
    return {
      label: '결제 확인중',
      disabled: true,
    };
  }

  if (status === STATE_CODES.RESERVATION_CANCELED) {
    return {
      label: '예약 취소 완료',
      color: 'black',
      disabled: true,
    };
  }

  if (status === STATE_CODES.RESERVATION_REFUSED) {
    return {
      label: '작가님의 예약 거절',
      color: 'black',
      disabled: true,
    };
  }

  return null;
};
