'use client';

import { useRouter } from 'next/navigation';
import { BottomCTAButton } from '@/ui';
import { STATE_CODES, StateCode } from '@/types/stateCode';
import { useCompleteReservation, useConfirmReservation } from '../api';
import { PHOTOGRAPHERS_ROUTES } from '@/constants/routes/routes';

type DetailPageBottomCTAProps = {
  reservationId: number;
  date: string;
  status: StateCode;
};

type ButtonConfig = {
  label: string;
  disabled: boolean;
  onClick?: () => void;
};

const getCTAConfig = (label: string, disabled: boolean, onClick?: () => void): ButtonConfig => ({
  label,
  disabled,
  onClick,
});

export default function DetailPageBottomCTA({
  reservationId,
  date,
  status,
}: DetailPageBottomCTAProps) {
  const router = useRouter();
  const { mutate: completeReservation } = useCompleteReservation();
  const { mutate: confirmReservation } = useConfirmReservation();

  const [y, m, d] = date.split('-').map(Number);
  const reservationStart = new Date(y, m - 1, d);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isAfterStart = today >= reservationStart;

  const getButtonConfig = (): ButtonConfig => {
    switch (status) {
      case STATE_CODES.PHOTOGRAPHER_CHECKING:
        return getCTAConfig('결제 요청하기', false, () => {
          router.push(PHOTOGRAPHERS_ROUTES.PAYMENT(reservationId));
        });
      case STATE_CODES.PAYMENT_COMPLETED:
        return getCTAConfig('예약 확정하기', false, () => {
          confirmReservation(reservationId);
        });
      case STATE_CODES.RESERVATION_CONFIRMED: {
        if (isAfterStart) {
          return getCTAConfig('촬영 완료하고 리뷰 요청하기', false, () => {
            completeReservation(reservationId);
          });
        }
        return getCTAConfig('예약 확정', true);
      }
      case STATE_CODES.PAYMENT_REQUESTED:
        return getCTAConfig('결제 요청 중', true);
      case STATE_CODES.SHOOT_COMPLETED:
        return getCTAConfig('리뷰 요청 완료', true);
      case STATE_CODES.RESERVATION_CANCELED:
        return getCTAConfig('고객님의 예약 취소', true);
      case STATE_CODES.RESERVATION_REFUSED:
        return getCTAConfig('예약 거절 완료', true);
      case STATE_CODES.RESERVATION_REQUESTED:
        return getCTAConfig('예약 요청 중', true);
      default:
        return getCTAConfig('', true);
    }
  };

  const { label, disabled, onClick } = getButtonConfig();

  return (
    <>
      <BottomCTAButton className='bg-black-1 bottom-0' hasPadding fixed>
        <BottomCTAButton.Single disabled={disabled} onClick={onClick}>
          {label}
        </BottomCTAButton.Single>
      </BottomCTAButton>
      <div className='bg-black-1 h-[6.3rem]' />
    </>
  );
}
