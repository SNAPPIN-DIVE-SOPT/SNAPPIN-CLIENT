export type StateCode =
  | 'RESERVATION_REQUESTED' // 예약 요청
  | 'AUTHOR_CONFIRMING' // 작가 확인 중
  | 'PAYMENT_REQUESTED' // 결제 요청
  | 'PAYMENT_COMPLETED' // 결제 완료
  | 'RESERVATION_COMPLETED' // 예약 확정
  | 'RESERVATION_REFUSED' // 예약 거절
  | 'RESERVATION_CANCELLED' // 예약 취소
  | 'SHOOT_COMPLETED'; // 촬영 완료
