export const TAB = {
  PHOTOGRAPHER_REQUESTED: 'PHOTOGRAPHER_REQUESTED',
  PHOTOGRAPHER_ADJUSTING: 'PHOTOGRAPHER_ADJUSTING',
  PHOTOGRAPHER_CONFIRMED: 'PHOTOGRAPHER_CONFIRMED',
  PHOTOGRAPHER_DONE: 'PHOTOGRAPHER_DONE',
} as const;

export const RESERVATION_TABS = [
  { value: TAB.PHOTOGRAPHER_REQUESTED, label: '예약 요청' },
  { value: TAB.PHOTOGRAPHER_ADJUSTING, label: '조율 중' },
  { value: TAB.PHOTOGRAPHER_CONFIRMED, label: '예약 확정' },
  { value: TAB.PHOTOGRAPHER_DONE, label: '촬영 완료' },
];

export type ReservationTab = (typeof TAB)[keyof typeof TAB];

const isReservationTab = (value: string | null): value is ReservationTab => {
  return Object.values(TAB).includes(value as ReservationTab);
};

export const getSelectedTab = (tab: string | null): ReservationTab => {
  if (isReservationTab(tab)) {
    return tab as ReservationTab;
  }
  return TAB.PHOTOGRAPHER_REQUESTED;
};
