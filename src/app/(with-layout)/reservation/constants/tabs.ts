export const RESERVATION_TAB = {
  CLIENT_OVERVIEW: 'CLIENT_OVERVIEW',
  CLIENT_DONE: 'CLIENT_DONE',
} as const;

export type ReservationTab = keyof typeof RESERVATION_TAB;

export const RESERVATION_TAB_MAP: Record<ReservationTab, string> = {
  CLIENT_OVERVIEW: '예약 현황',
  CLIENT_DONE: '촬영 완료',
} as const;
