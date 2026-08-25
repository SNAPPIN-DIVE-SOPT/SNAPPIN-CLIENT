export const SERVER_API_BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_BASE_URL;

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export const API_ERRORS = {
  //400 Bad Request: 잘못된 문법 등으로 서버가 요청을 이해할 수 없음
  400: 'badRequest',
  //401 Unauthorized: 인증이 필요하거나 인증 실패
  401: 'unauthorized',
  //403 Forbidden: 서버가 요청을 이해했지만 권한 부족 등으로 거부
  403: 'forbidden',
  //404 Not Found: 요청한 리소스(페이지 등)를 찾을 수 없음
  404: 'notFound',
  //409 Conflict: 요청이 서버의 현재 상태와 충돌할 때
  409: 'conflict',
  //500 이상: 서버 내부 오류 요청 처리 실패
  500: 'serverError',
} as const;

// API_ERRORS에 없는 상태 코드(예: 502, 503 등 500 이상 전체, 매핑 안 된 4xx)를 위한 대체값
export type ApiErrorKind = (typeof API_ERRORS)[keyof typeof API_ERRORS] | 'unknown';
