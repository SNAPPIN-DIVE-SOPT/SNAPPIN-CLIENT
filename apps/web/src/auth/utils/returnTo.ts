export type ReturnToContext = {
  returnTo?: string;
};

type SearchParamReader = {
  get(name: string): string | null;
};

const normalizeInternalReturnTo = (value: string | null | undefined) => {
  if (!value || !value.startsWith('/') || value.startsWith('//')) {
    return undefined;
  }

  return value;
};

/**
 * 쿼리 파라미터에서 returnTo 값을 읽어 안전한 내부 경로만 컨텍스트로 만듭니다.
 * 외부 도메인으로의 오픈 리다이렉트를 막기 위해 `/`로 시작하지 않거나 `//`로
 * 시작하는 값은 무시합니다.
 * @param params `get(name)`을 지원하는 쿼리 파라미터 리더 (예: URLSearchParams)
 * @returns returnTo 컨텍스트
 * @example const context = readReturnToContext(new URLSearchParams(location.search));
 */
export const readReturnToContext = (params: SearchParamReader): ReturnToContext => ({
  returnTo: normalizeInternalReturnTo(params.get('returnTo')),
});

/**
 * returnTo 컨텍스트를 쿼리 파라미터 객체로 변환합니다.
 * @param context returnTo 컨텍스트
 * @returns returnTo가 있으면 `{ returnTo }`, 없으면 undefined
 * @example const query = getReturnToParam(context); // { returnTo: '/mypage' } | undefined
 */
export const getReturnToParam = (context: ReturnToContext) =>
  context.returnTo ? { returnTo: context.returnTo } : undefined;

/**
 * returnTo 컨텍스트에서 이동할 경로를 결정합니다.
 * @param context returnTo 컨텍스트
 * @param fallbackPath returnTo가 없을 때 사용할 기본 경로
 * @returns 이동할 경로
 * @example const path = resolveReturnToPath(context, '/'); // '/mypage'
 */
export const resolveReturnToPath = (context: ReturnToContext, fallbackPath: string) =>
  context.returnTo ?? fallbackPath;
