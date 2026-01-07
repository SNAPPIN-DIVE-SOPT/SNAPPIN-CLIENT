import { StateCode } from '../types/stateCode';

// TODO: 서버 enum 확정되면 변경
export const STATE_LABEL: Record<StateCode, string> = {
  PHOTOGRAPHER_REQUESTED: '예약 요청',
  PHOTOGRAPHER_CHECKING: '작가 확인 중',
  PAYMENT_COMPLETED: '결제 완료',
  RESERVATION_CONFIRMED: '예약 확정',
  RESERVATION_REFUSED: '예약 거절',
  RESERVATION_CANCELED: '예약 취소',
  SHOOT_COMPLETED: '촬영 완료',
} as const;
