'use client';

import { RESERVATION_TAB } from '../constants/tabs';
import ReservationCardListSection from './ReservationCardListSection';

export default function ShootCompletedListSection() {
  return (
    <ReservationCardListSection
      tab={RESERVATION_TAB.CLIENT_DONE}
      emptyTitle='촬영 완료된 상품이 없어요'
    />
  );
}
