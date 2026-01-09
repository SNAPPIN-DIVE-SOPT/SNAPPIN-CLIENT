export function formatNumberWithComma(value: number): string {
  return new Intl.NumberFormat('ko-KR').format(value);
}

/**
 * 날짜를 콤마로 포맷팅하는 함수
 * @param date 날짜 (YYYY-MM-DD)
 * @returns 콤마로 포맷팅된 날짜 (ex. 2026.01.01)
 */
export function formatDate(date: string): string {
  const [year, month, day] = date.split('-');
  return `${Number(year)}.${Number(month)}.${Number(day)}`;
}

/**
 * 예약 날짜와 시간을 표시용 문자열로 포맷팅하는 함수
 * @param date YYYY-MM-DD 형식의 날짜 문자열
 * @param startTime HH:mm 형식의 시간 문자열
 * @returns 포맷팅된 날짜/시간 문자열 (ex. "3/15 14시 30분" or "3/15 14시")
 */
export const formatReservationDateTime = (date: string, startTime: string): string => {
  const [, month, day] = date.split('-');
  const [hour, minute] = startTime.split(':');

  const monthNum = Number(month);
  const dayNum = Number(day);
  const hourNum = Number(hour);
  const minuteNum = Number(minute);

  const minuteStr = minuteNum !== 0 ? ` ${minuteNum}분` : '';

  return `${monthNum}/${dayNum} ${hourNum}시${minuteStr}`;
};
