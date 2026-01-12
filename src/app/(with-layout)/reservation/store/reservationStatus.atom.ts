import { atom } from 'jotai';

import type { StateCode } from '@/types/stateCode';
import { RESERVATION_MOCK } from '@/app/client/(with-layout)/reservation/mock/reservationList.mock';

const createReservationStatusByReservationProductId = () =>
  RESERVATION_MOCK.reservations.reduce<Record<number, StateCode>>(
    (reservationStatusByReservationProductId, { reservation }) => ({
      ...reservationStatusByReservationProductId,
      [reservation.reservationId]: reservation.status,
    }),
    {},
  );

export const ReservationStatusByReservationProductIdAtom = atom<Record<number, StateCode>>(
  createReservationStatusByReservationProductId(),
);
