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
