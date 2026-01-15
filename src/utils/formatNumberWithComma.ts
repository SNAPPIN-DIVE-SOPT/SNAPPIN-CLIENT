export function formatNumberWithComma(value: number): string {
  return new Intl.NumberFormat('ko-KR').format(value);
}

/**
 * 날짜를 년.월.일 형식으로 포맷팅하는 함수
 * @param date 날짜 (YYYY-MM-DD)
 * @returns 포맷팅된 날짜 (ex. 2026.01.01)
 */
export function formatDate(date: string): string {
  const [year, month, day] = date.split('-');
  return `${Number(year)}.${Number(month)}.${Number(day)}`;
}

/**
 * 예약 날짜와 시간을 표시용 문자열로 포맷팅하는 함수
 * @param date YYYY-MM-DD 형식의 날짜 문자열
 * @param startTime HH:mm 형식의 시간 문자열
 * @returns 포맷팅된 날짜/시간 문자열
 *  (ex. "3/15 오후 2시 30분", "3/15 오전 12시")
 */
export const formatReservationDateTime = (date: string, startTime: string): string => {
  const [, month, day] = date.split('-');
  const [hour, minute] = startTime.split(':');

  const monthNum = Number(month);
  const dayNum = Number(day);
  const hourNum = Number(hour);
  const minuteNum = Number(minute);

  const isAM = hourNum < 12;
  const ampm = isAM ? '오전' : '오후';

  const displayHour = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;

  const minuteStr = minuteNum !== 0 ? ` ${minuteNum}분` : '';

  return `${monthNum}/${dayNum} ${ampm} ${displayHour}시${minuteStr}`;
};

/**
 * 생성 날짜와 시간을 표시용 문자열로 포맷팅하는 함수
 * @param date YYYY-MM-DD HH:mm 또는 YYYY-MM-DD HH:mm:ss 형식의 날짜 문자열
 * @returns 포맷팅된 날짜/시간 문자열 (ex. "26년 01월 01일 23:23")
 */
export const formatCreatedAt = (date: string) => {
  const [dateStr, timeStr] = date.split(' ');
  if (!dateStr || !timeStr) {
    return date; // Invalid format, return as-is
  }
  const [year, month, day] = dateStr.split('-');
  const [hour, minute] = timeStr.split(':');

  // Extract last 2 digits of year
  const yearShort = year.slice(-2);
  const minuteStr = minute.padStart(2, '0');

  return `${yearShort}년 ${Number(month)}월 ${Number(day)}일 ${Number(hour)}:${minuteStr}`;
};

/**
 * 예약 시간을 포맷팅하는 함수
 * @param durationTime 예약 시간 (분)
 * @returns 포맷팅된 예약 시간 (ex. 2시간, 2.5시간)
 */
export const formatReservationTime = (durationTime: number) => {
  const hours = Math.floor(durationTime / 60);
  const minutes = durationTime % 60;
  const minuteStr = minutes !== 0 ? ` ${minutes}분` : '';

  return `${hours}시간${minuteStr}`;
};
