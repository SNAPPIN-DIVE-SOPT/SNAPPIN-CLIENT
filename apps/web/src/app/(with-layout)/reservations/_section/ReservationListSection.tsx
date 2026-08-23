'use client';

import { RESERVATION_TAB } from '../constants/tabs';
import ReservationCardListSection from './ReservationCardListSection';

export default function ReservationListSection() {
  return (
    <ReservationCardListSection
      tab={RESERVATION_TAB.CLIENT_OVERVIEW}
      emptyTitle='예약 문의한 상품이 없어요'
    />
  );
}
