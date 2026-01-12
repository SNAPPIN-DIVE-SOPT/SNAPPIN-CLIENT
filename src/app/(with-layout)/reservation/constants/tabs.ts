export const RESERVATION_TABS = [
  {
    label: '예약 현황',
    value: 'CLIENT_OVERVIEW',
  },
  {
    label: '촬영 완료',
    value: 'CLIENT_DONE',
  },
] as const;

export type ReservationTabValue = (typeof RESERVATION_TABS)[number]['value'];
