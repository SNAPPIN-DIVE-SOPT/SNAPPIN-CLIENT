import { atom } from 'jotai';

export type ReviewWriteData = {
  reservationProductId: number;
  rating: number;
  content: string;
  imageUrls: string[];
  createdAt: string;
  reviewer: string;
};

export type ReviewByReservationProductId = Record<number, ReviewWriteData | undefined>;

export const ReviewByReservationProductIdAtom = atom<ReviewByReservationProductId>({});
