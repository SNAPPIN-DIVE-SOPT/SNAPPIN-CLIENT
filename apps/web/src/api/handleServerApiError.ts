import 'server-only';

import { notFound, redirect } from 'next/navigation';
import { ROUTES } from '@/constants/routes/routes';
import { ApiError, getApiErrorKind } from '@/api/apiError';

/**
 * 서버 컴포넌트/라우트 핸들러에서 API 에러를 상태 코드 종류에 따라 처리합니다.
 * notFound는 Next.js의 404 페이지로, unauthorized는 로그인 페이지로 리다이렉트하고,
 * 그 외(forbidden/conflict/serverError/unknown)는 가장 가까운 error.tsx 바운더리로
 * 다시 던집니다. ApiError가 아닌 값은 그대로 다시 던집니다.
 * @param error apiRequest에서 catch한 에러 (unknown)
 * @example
 * try {
 *   return await apiRequest({ endPoint: `/api/v1/products/${id}` });
 * } catch (error) {
 *   handleServerApiError(error);
 * }
 */
export const handleServerApiError = (error: unknown): never => {
  if (!(error instanceof ApiError)) {
    throw error;
  }

  const kind = getApiErrorKind(error.status);

  if (kind === 'notFound') {
    notFound();
  }

  if (kind === 'unauthorized') {
    redirect(ROUTES.LOGIN());
  }

  throw error;
};
