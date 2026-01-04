import { CalendarCell } from '@/ui/date/picker/type/calendar';

const DEFAULT_PAD_WIDTH = 2;
const DEFAULT_PAD_CHAR = '0';

/**
 * 숫자를 2자리로 패딩합니다. (예: 5 -> "05")
 * @param num 숫자
 * @param option 패딩 옵션
 * @param option.length 패딩 길이 (기본값: 2)
 * @param option.padChar 패딩 문자 (기본값: '0')
 * @returns 패딩된 문자열
 * @example const padded = padNumber(5); // '05'
 */
export const padNumber = (num: number, option?: { length?: number; padChar?: string }) =>
  String(num).padStart(option?.length ?? DEFAULT_PAD_WIDTH, option?.padChar ?? DEFAULT_PAD_CHAR);

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
 * ISO 형식(YYYY-MM-DD)의 문자열을 날짜 객체로 변환합니다.
 * @param iso ISO 형식 문자열 (YYYY-MM-DD)
 * @returns 날짜 객체
 * @example const date = fromISO('2024-01-15'); // Date 객체 생성
 */
export const fromISO = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
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

/**
 * 달력의 접미부 빈 셀을 생성합니다.
 * @param year 연도
 * @param monthIndex 월 인덱스 (0-11)
 * @param prefixLength 접두부 빈 셀 길이
 * @param dayLength 해당 월의 일수
 * @returns 접미부 빈 셀 배열 ex. [{ kind: 'empty', key: 'e-post-2024-0-0' }, ...]
 * @example const suffixCells: CalendarCell[] = buildSuffixCells(year, monthIndex, startDay, totalDays);
 */
export const buildSuffixCells = (
  year: number,
  monthIndex: number,
  prefixLength: number,
  dayLength: number,
): CalendarCell[] => {
  const remainder = (prefixLength + dayLength) % 7;
  if (remainder === 0) return [];

  return Array.from({ length: 7 - remainder }, (_, i) => ({
    kind: 'empty',
    key: `e-post-${year}-${monthIndex}-${i}`,
  }));
};
