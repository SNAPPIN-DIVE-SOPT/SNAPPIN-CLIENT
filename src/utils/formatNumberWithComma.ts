export function formatNumberWithComma(value: number): string {
  return new Intl.NumberFormat('ko-KR').format(value);
}