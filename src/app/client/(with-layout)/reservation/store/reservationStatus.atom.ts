import { atom } from 'jotai';

import type { StateCode } from '@/types/stateCode';
import { RESERVATION_MOCK } from '@/app/client/(with-layout)/reservation/mock/reservationList.mock';

const createReservationStatusByReservationProductId = () =>
  RESERVATION_MOCK.products.reduce<Record<number, StateCode>>(
    (reservationStatusByReservationProductId, { id, status }) => ({
      ...reservationStatusByReservationProductId,
      [id]: status,
    }),
    {},
  );

export const ReservationStatusByReservationProductIdAtom = atom<Record<number, StateCode>>(
  createReservationStatusByReservationProductId(),
);

