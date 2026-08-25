import { API_ERRORS, type ApiErrorKind } from './constants/api';

export type { ApiErrorKind };

/**
 * 서버 API 요청이 실패했을 때 apiRequest 계층이 던지는 구조화된 에러입니다.
 * HTTP 상태 코드와, 서버가 내려준(또는 파싱에 실패했을 때의 대체) 메시지를 담습니다.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, message: string, body?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

/**
 * HTTP 상태 코드를 분기 처리에 쓸 수 있는 에러 종류로 분류합니다.
 * @param status HTTP 상태 코드
 * @returns 에러 종류
 * @example getApiErrorKind(404); // 'notFound'
 */
export const getApiErrorKind = (status: number): ApiErrorKind => {
  if (status in API_ERRORS) {
    return API_ERRORS[status as keyof typeof API_ERRORS];
  }

  // API_ERRORS에 없는 5xx(502, 503 등)는 전부 serverError로 묶는다.
  if (status >= 500) return 'serverError';

  return 'unknown';
};
