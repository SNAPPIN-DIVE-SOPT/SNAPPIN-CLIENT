export const RESERVATION_TAB = {
  CLIENT_OVERVIEW: 'CLIENT_OVERVIEW',
  CLIENT_DONE: 'CLIENT_DONE',
} as const;

export type ReservationTab = keyof typeof RESERVATION_TAB;

export const RESERVATION_TAB_MAP: Record<ReservationTab, string> = {
  CLIENT_OVERVIEW: '예약 현황',
  CLIENT_DONE: '촬영 완료',
} as const;

export const RESERVATION_TAB_ITEMS: { value: ReservationTab; label: string }[] = [
  { value: RESERVATION_TAB.CLIENT_OVERVIEW, label: RESERVATION_TAB_MAP.CLIENT_OVERVIEW },
  { value: RESERVATION_TAB.CLIENT_DONE, label: RESERVATION_TAB_MAP.CLIENT_DONE },
];
