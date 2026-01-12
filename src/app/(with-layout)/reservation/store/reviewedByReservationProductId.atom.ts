import { atom } from 'jotai';

export type ReviewedByReservationProductId = Record<number, boolean | undefined>;

export const ReviewedByReservationProductIdAtom = atom<ReviewedByReservationProductId>({});
