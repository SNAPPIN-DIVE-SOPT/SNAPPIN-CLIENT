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
