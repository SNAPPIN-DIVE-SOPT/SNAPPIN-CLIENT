'use client';

import { ApiError, getApiErrorKind, type ApiErrorKind } from '@/api/apiError';
import { useToast } from './useToast';

const DEFAULT_MESSAGE_BY_KIND: Record<ApiErrorKind, string> = {
  badRequest: '요청 내용을 다시 확인해주세요.',
  unauthorized: '로그인이 필요해요.',
  forbidden: '권한이 없어요.',
  notFound: '요청하신 정보를 찾을 수 없어요.',
  conflict: '이미 처리된 요청이에요.',
  serverError: '일시적인 오류가 발생했어요. 잠시 후 다시 시도해주세요.',
  unknown: '요청에 실패했어요. 다시 시도해주세요.',
};

type UseApiErrorToastOptions = {
  messageByKind?: Partial<Record<ApiErrorKind, string>>;
  fallbackMessage?: string;
  className?: string;
  duration?: number;
  returnTo?: string;
};

/**
 * API 에러를 상태 코드 종류(kind)에 따라 적절한 토스트로 보여주는 핸들러를 만듭니다.
 * kind가 'unauthorized'면 로그인 유도 토스트를, 그 외엔 일반 에러 토스트를 띄웁니다.
 * 메시지는 kind별 override → fallbackMessage → 서버가 내려준 메시지 → kind별 기본
 * 문구 순으로 결정됩니다.
 * @param options 토스트 커스터마이징 옵션
 * @param options.messageByKind kind별로 보여줄 메시지를 덮어씀
 * @param options.fallbackMessage messageByKind에 없는 kind에 대해, 서버 메시지 대신
 *   항상 보여줄 고정 문구 (예: 특정 액션에서 원인과 무관하게 같은 안내를 보여주고 싶을 때)
 * @param options.className 토스트에 적용할 위치/스타일 클래스
 * @param options.duration 토스트 노출 시간(ms)
 * @param options.returnTo 로그인 토스트에서 로그인 후 돌아올 경로
 * @returns `onError`에 그대로 넘길 수 있는 `(error: unknown) => void` 핸들러
 * @example
 * const handleCancelError = useApiErrorToast({ fallbackMessage: '예약 취소 중 오류가 발생했습니다.' });
 * mutate(id, { onError: handleCancelError });
 */
export const useApiErrorToast = (options: UseApiErrorToastOptions = {}) => {
  const toast = useToast();
  const { messageByKind, fallbackMessage, className, duration, returnTo } = options;

  return (error: unknown) => {
    const kind: ApiErrorKind =
      error instanceof ApiError ? getApiErrorKind(error.status) : 'unknown';
    const serverMessage = error instanceof ApiError ? error.message : undefined;
    const message =
      messageByKind?.[kind] ?? fallbackMessage ?? serverMessage ?? DEFAULT_MESSAGE_BY_KIND[kind];

    if (kind === 'unauthorized') {
      toast.login(message, className, returnTo, duration);
      return;
    }

    toast.error(message, className, duration);
  };
};
