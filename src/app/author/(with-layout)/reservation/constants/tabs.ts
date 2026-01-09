export const RESERVATION_TABS = [
  {
    label: '예약 요청',
    value: 'PHOTOGRAPHER_REQUESTED',
  },
  {
    label: '조율 중',
    value: 'PHOTOGRAPHER_ADJUSTING',
  },
  {
    label: '예약 확정',
    value: 'PHOTOGRAPHER_CONFIRMED',
  },
  {
    label: '촬영 완료',
    value: 'PHOTOGRAPHER_DONE',
  },
];

export type ReservationTabValue = (typeof RESERVATION_TABS)[number]['value'];
