'use client';

import { BottomCTAButton } from '@/ui';
import { STATE_CODES, type StateCode } from '@/types/stateCode';

type ClientFooterProps = {
  status: StateCode;
  handlePaymentConfirmClick: () => void;
  isPaymentRequestPending: boolean;
};

export default function ClientFooter({
  status,
  handlePaymentConfirmClick,
  isPaymentRequestPending,
}: ClientFooterProps) {
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
      disabled: isPaymentRequestPending,
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

  const config = BOTTOM_CTA_CONFIG[status];
  if (!config) return null;

  const { label, color, disabled, onClick } = config;

  return (
    <footer>
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
    </footer>
  );
}
