import { CalendarCell } from '@/ui/date/picker/types/calendar';
import { padNumber } from '@/utils/padNumber';

/**
 * 날짜를 ISO 형식(YYYY-MM-DD)으로 변환합니다.
 * @param date 날짜 객체
 * @returns ISO 형식 문자열 (YYYY-MM-DD)
 * @example const isoString = toISO(new Date(2024, 0, 15)); // '2024-01-15'
 */
export const toISO = (date: Date) => {
  const y = date.getFullYear();
  const m = padNumber(date.getMonth() + 1);
  const d = padNumber(date.getDate());
  return `${y}-${m}-${d}`;
};

/**
 * 해당 날짜의 월 시작일을 반환합니다.
 * @param date 날짜 객체
 * @returns 해당 월의 시작일 날짜 객체
 * @example const start = startOfMonth(new Date(2024, 0, 15)); // 2024년 1월 1일
 */
export const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);

/**
 * 날짜에 월 단위로 델타를 더한 새로운 날짜 객체를 반환합니다.
 * @param date 기준 날짜 객체
 * @param delta 더할 월 수 (음수 가능)
 * @returns 새로운 날짜 객체 (월의 첫째 날)
 * @example const nextMonth = addMonths(new Date(2024, 0, 15), 1); // 2024년 2월 1일
 */
export const addMonths = (date: Date, delta: number) =>
  new Date(date.getFullYear(), date.getMonth() + delta, 1);

/**
 * 해당 날짜가 속한 월의 총 일수를 반환합니다.
 * @param date 날짜 객체
 * @returns 해당 월의 총 일수
 * @example const totalDays = daysInMonth(new Date(2024, 1, 1)); // 29 (2024년 2월)
 */
export const daysInMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

/**
 * 두 ISO 형식 날짜 문자열을 비교합니다.
 * @param a 첫 번째 ISO 형식 문자열
 * @param b 두 번째 ISO 형식 문자열
 * @returns 비교 결과 (음수: a < b, 0: a == b, 양수: a > b)
 * @example const result = compareISO('2024-01-15', '2024-01-20'); // result < 0
 */
export const compareISO = (a: string, b: string) => a.localeCompare(b);

/**
 * 달력의 접두부 빈 셀을 생성합니다.
 * @param year 연도
 * @param monthIndex 월 인덱스 (0-11)
 * @param startDay 시작 요일 인덱스 (0: 일요일, 1: 월요일, ..., 6: 토요일)
 * @returns 접두부 빈 셀 배열 ex. [{ kind: 'empty', key: 'e-pre-2024-0-0' }, ...]
 * @example const prefixCells: CalendarCell[] = buildPrefixCells(year, monthIndex, startDay);
 */
export const buildPrefixCells = (
  year: number,
  monthIndex: number,
  startDay: number,
): CalendarCell[] => {
  return Array.from({ length: startDay }, (_, i) => ({
    kind: 'empty',
    key: `e-pre-${year}-${monthIndex}-${i}`,
  }));
};
