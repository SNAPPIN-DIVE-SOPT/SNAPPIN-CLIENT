'use client';

import { useRouter } from 'next/navigation';
import { BottomCTAButton } from '@snappin/design-system';
import { useCompleteReservation, useConfirmReservation } from '../api';
import { PHOTOGRAPHERS_ROUTES } from '@/constants/routes/routes';
import { STATE_CODES, StateCode } from '@snappin/shared/types';

type DetailPageBottomCTAProps = {
  reservationId: number;
  date: string;
  status: StateCode;
};

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

  const { label, disabled, onClick } = match(status)
    .with(STATE_CODES.PHOTOGRAPHER_CHECKING, () =>
      availableButton('결제 요청하기', () => {
        router.push(PHOTOGRAPHERS_ROUTES.PAYMENT(reservationId));
      }),
    )
    .with(STATE_CODES.PAYMENT_COMPLETED, () =>
      availableButton('예약 확정하기', () => {
        confirmReservation(reservationId);
      }),
    )
    .with(
      STATE_CODES.RESERVATION_CONFIRMED,
      () => isAfterStart,
      () =>
        availableButton('촬영 완료하고 리뷰 요청하기', () => completeReservation(reservationId)),
    )
    .with(
      STATE_CODES.RESERVATION_CONFIRMED,
      () => !isAfterStart,
      () => disabledButton('예약 확정'),
    )
    .with(STATE_CODES.PAYMENT_REQUESTED, () => disabledButton('결제 요청 중'))
    .with(STATE_CODES.SHOOT_COMPLETED, () => disabledButton('리뷰 요청 완료'))
    .with(STATE_CODES.RESERVATION_CANCELED, () => disabledButton('고객님의 예약 취소'))
    .with(STATE_CODES.RESERVATION_REFUSED, () => disabledButton('예약 거절 완료'))
    .with(STATE_CODES.RESERVATION_REQUESTED, () => disabledButton('예약 요청 중'))
    .otherwise(() => disabledButton(''));

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

const availableButton = (label: string, onClick: () => void) => ({
  label,
  disabled: false,
  onClick,
});

const disabledButton = (label: string) => ({
  label,
  disabled: true,
  onClick: undefined,
});
