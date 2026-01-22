'use client';

import { STATE_CODES, StateCode } from '@/types/stateCode';
import { BottomCTAButton } from '@/ui';
import { useRouter } from 'next/navigation';
import { useCompleteReservation, useConfirmReservation } from '../api';

type DetailPageFooterProps = {
  reservationId: number;
  date: string; // 예약 날짜 (YYYY-MM-DD)
  startTime: string; // 10:00
  status: StateCode;
};

type ButtonConfig = {
  label: string;
  disabled: boolean;
  onClick?: () => void;
};

export default function DetailPageFooter({
  reservationId,
  date,
  startTime,
  status,
}: DetailPageFooterProps) {
  const router = useRouter();
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const [y, m, d] = date.split('-').map(Number);
  const start = new Date(y, m - 1, d);

  const isAfterStart = now >= start; 

  const { mutate: completeReservation } = useCompleteReservation();
  const { mutate: confirmReservation } = useConfirmReservation();

  const getButtonConfig = (): ButtonConfig => {
    switch (status) {
      case STATE_CODES.PHOTOGRAPHER_CHECKING:
        return {
          label: '결제 요청하기',
          disabled: false,
          onClick: () => {
            router.push(`/photographer/payment/${reservationId}`);
          },
        };
      case STATE_CODES.PAYMENT_REQUESTED:
        return {
          label: '결제 요청 중',
          disabled: true,
          onClick: undefined,
        };
      case STATE_CODES.PAYMENT_COMPLETED:
        return {
          label: '예약 확정하기',
          disabled: false,
          onClick: () => {
            confirmReservation(reservationId);
          },
        };

      case STATE_CODES.RESERVATION_CONFIRMED:
        if (isAfterStart) {
          return {
            label: '촬영 완료하고 리뷰 요청하기',
            disabled: false,
            onClick: () => {
              completeReservation(reservationId);
            },
          };
        }
        return {
          label: '예약 확정',
          disabled: true,
          onClick: undefined,
        };
      case STATE_CODES.SHOOT_COMPLETED:
        return {
          label: '리뷰 요청 완료',
          disabled: true,
          onClick: undefined,
        };
      case STATE_CODES.RESERVATION_CANCELED:
        return {
          label: '고객님의 예약 취소',
          disabled: true,
          onClick: undefined,
        };
      case STATE_CODES.RESERVATION_REFUSED:
        return {
          label: '예약 거절 완료',
          disabled: true,
          onClick: undefined,
        };

      default:
        return {
          label: '',
          disabled: true,
          onClick: undefined,
        };
    }
  };

  const { label, disabled, onClick } = getButtonConfig();

  return (
    <BottomCTAButton className='bg-black-1 fixed-center bottom-0' hasPadding>
      <BottomCTAButton.Single disabled={disabled} onClick={onClick}>
        {label}
      </BottomCTAButton.Single>
    </BottomCTAButton>
  );
}
