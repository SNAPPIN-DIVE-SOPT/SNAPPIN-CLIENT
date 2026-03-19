import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

type NavMode = 'push' | 'replace';

/**
 * query param에 들어갈 수 있는 값 타입
 * - array는 동일 key를 여러 번 append 하는 방식으로 처리됨 (ex. moodIds=1&moodIds=2)
 * - null/undefined/'' 는 해당 key 삭제로 처리
 */
type SetValue = string | number | boolean | null | undefined | (string | number | boolean)[];

/**
 * patch(updates)에서 사용할 업데이트 객체
 * ex) { tab: 'product', moodIds: [1, 2], placeName: null }
 */
type Patch = Record<string, SetValue>;

const toStringValue = (v: string | number | boolean) => String(v);

/**
 * query param 유틸 훅
 *
 * 목적
 * - 현재 URLSearchParams를 "읽기 전용 스냅샷"으로 다룸
 * - allowedKeys 기반 안전한 필터링
 * - patch로 수정한 URLSearchParams를 만듦
 * - navigate로 push/replace 이동 처리
 *
 * 주의
 * - patch는 URLSearchParams를 "리턴"만 함 (즉시 네비게이션 하지 않음)
 * - navigate를 호출해야 URL이 실제로 바뀜
 */
export const useQueryParams = (allowedKeys?: readonly string[]) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // allowedKeys가 주어지면 해당 key만 통과시키는 필터로 사용
  // - 탭 전환, 검색 조건 등 허용된 키만 유지
  // - 불필요한/외부 유입 query 제거하는 안전장치 역할
  const allowed = useMemo(() => (allowedKeys ? new Set(allowedKeys) : null), [allowedKeys]);
  const snapshot = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);

  // query param을 타입별로 읽기 위한 helper
  const read = useMemo(() => {
    // string
    const get = (key: string, fallback = '') => snapshot.get(key) ?? fallback;

    // number | null
    const getNumber = (key: string, fallback: number | null = null) => {
      const raw = snapshot.get(key);
      if (raw === null || raw === '') return fallback;
      const num = Number(raw);
      return Number.isNaN(num) ? fallback : num;
    };

    // boolean
    const getBoolean = (key: string, fallback = false) => {
      const raw = snapshot.get(key);
      if (raw === null) return fallback;
      return raw === 'true' || raw === '1';
    };

    // string[]
    const getAll = (key: string) => snapshot.getAll(key);

    return { get, getNumber, getBoolean, getAll, raw: snapshot };
  }, [snapshot]);

  // allowedKeys 기반 필터링
  const pickAllowed = useCallback(
    (params: URLSearchParams) => {
      // allowedKeys 없으면 그대로 복사
      if (!allowed) return new URLSearchParams(params.toString());

      // 있으면 allowed에 포함된 key만 next에 복제
      const next = new URLSearchParams();
      for (const key of allowed) {
        const values = params.getAll(key);
        for (const v of values) next.append(key, v);
      }

      return next;
    },
    [allowed],
  );

  const setParam = useCallback(
    (params: URLSearchParams, key: string, value: SetValue) => {
      // allowedKeys가 있고 key가 허용되지 않으면 무시
      if (allowed && !allowed.has(key)) return;

      // Array면 기존 key 삭제 후 다중 append
      if (Array.isArray(value)) {
        params.delete(key);
        for (const v of value) params.append(key, toStringValue(v));
        return;
      }

      // value가 null/undefined/''면 key 삭제
      if (value === null || value === '' || value === undefined) {
        params.delete(key);
        return;
      }

      // 나머지 set
      params.set(key, toStringValue(value));
    },
    [allowed],
  );

  // 현재 snapshot(혹은 base)을 기반으로 updates를 반영한 새 URLSearchParams 생성
  const patch = useCallback(
    (updates: Patch, base?: URLSearchParams) => {
      const params = pickAllowed(base ?? snapshot);
      for (const [key, value] of Object.entries(updates)) setParam(params, key, value);
      return params;
    },
    [pickAllowed, setParam, snapshot],
  );

  // URLSearchParams를 실제 URL로 반영(push/replace)
  const navigate = useCallback(
    (
      params: URLSearchParams,
      options?: {
        basePath?: string;
        mode?: NavMode;
      },
    ) => {
      const basePath = options?.basePath ?? pathname;
      const query = params.toString();
      const target = query ? `${basePath}?${query}` : basePath;

      // basePath가 현재 pathname과 같으면 replace. 히스토리 오염 방지
      const mode = options?.mode ?? (pathname === basePath ? 'replace' : 'push');

      if (mode === 'replace') router.replace(target);
      else router.push(target);

      return target;
    },
    [pathname, router],
  );

  return {
    pathname,
    searchParams: snapshot,
    read,
    pickAllowed,
    patch,
    navigate,
  };
};
