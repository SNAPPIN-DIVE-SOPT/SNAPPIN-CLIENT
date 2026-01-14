/**
 * 예약 시간을 포맷팅하는 함수
 * @param durationTime 예약 시간 (분)
 * @returns 포맷팅된 예약 시간 (ex. 2시간, 2.5시간)
 */
export const formatReservationTime = (durationTime: number) => {
  const hours = Math.floor(durationTime / 60);
  const minutes = durationTime % 60;
  return `${hours}.${minutes}시간`;
};
