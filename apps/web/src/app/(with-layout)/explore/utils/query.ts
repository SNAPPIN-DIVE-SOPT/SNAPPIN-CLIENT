import { SnapCategory } from '@/constants/categories/snap-category';
import { EXPLORE_SORT, ExploreSort } from '@/app/(with-layout)/explore/constants/sort';
import { ALLOWED_KEYS } from '@/app/(with-layout)/explore/constants/query';
import {
  INITIAL_MAX_PRICE,
  INITIAL_MIN_PRICE,
  MAX_PRICE,
  MIN_PRICE,
} from '@/app/(with-layout)/explore/constants/price';

const parseNumberParam = (value: string | null) => {
  if (value === null || value.trim() === '') return null;

  const parsedNumber = Number(value);
  return Number.isFinite(parsedNumber) ? parsedNumber : null;
};

/**
 * 쿼리 파라미터의 콤마 구분 moodIds 문자열을 유효한 양의 정수 배열로 파싱합니다.
 * @param sp 현재 URL의 쿼리 파라미터
 * @returns 파싱된 mood id 배열 (없거나 전부 유효하지 않으면 빈 배열)
 * @example const moodIds = parseMoodIds(searchParams); // [1, 3, 5]
 */
export const parseMoodIds = (sp: URLSearchParams) => {
  const rawMoodIds = sp.get('moodIds');
  if (!rawMoodIds) return [];

  return rawMoodIds
    .split(',')
    .map((value) => Number(value))
    .filter((value) => Number.isInteger(value) && value > 0);
};

/**
 * 쿼리 파라미터의 minPrice/maxPrice를 허용 범위 안의 유효한 가격 범위로 파싱합니다.
 * 값이 없거나 유효하지 않거나 min이 max보다 크면 초기 가격 범위로 되돌립니다.
 * @param sp 현재 URL의 쿼리 파라미터
 * @returns `[minPrice, maxPrice]` 튜플
 * @example const [minPrice, maxPrice] = parsePriceRange(searchParams);
 */
export const parsePriceRange = (sp: URLSearchParams): [number, number] => {
  const minCandidate = parseNumberParam(sp.get('minPrice')) ?? INITIAL_MIN_PRICE;
  const maxCandidate = parseNumberParam(sp.get('maxPrice')) ?? INITIAL_MAX_PRICE;

  const minPrice = Math.min(Math.max(minCandidate, MIN_PRICE), MAX_PRICE);
  const maxPrice = Math.min(Math.max(maxCandidate, MIN_PRICE), MAX_PRICE);

  if (minPrice > maxPrice) return [INITIAL_MIN_PRICE, INITIAL_MAX_PRICE];

  return [minPrice, maxPrice];
};

/**
 * 쿼리 파라미터에서 탐색 검색 초안(카테고리, 장소, 날짜, 인원)을 읽어옵니다.
 * @param sp 현재 URL의 쿼리 파라미터
 * @returns 검색 초안 값
 * @example const draft = parseInitialDraft(searchParams);
 */
export const parseInitialDraft = (sp: URLSearchParams) => {
  const snapCategory = sp.get('snapCategory') as SnapCategory;
  const placeId = sp.get('placeId');
  const placeName = sp.get('placeName');
  const date = sp.get('date');
  const peopleCount = parseNumberParam(sp.get('peopleCount'));

  return { snapCategory, placeId, date, peopleCount, placeName };
};

/**
 * 쿼리 파라미터 값을 유효한 탐색 정렬 값으로 변환합니다.
 * @param value 쿼리에서 읽은 원본 값
 * @param fallback 유효하지 않을 때 사용할 기본 정렬 (기본값: RECOMMENDED)
 * @returns 유효한 ExploreSort 값
 * @example const sort = resolveExploreSort(searchParams.get('sort'));
 */
export const resolveExploreSort = (
  value: string | null | undefined,
  fallback: ExploreSort = EXPLORE_SORT.RECOMMENDED,
): ExploreSort => {
  const validSorts = Object.values(EXPLORE_SORT) as string[];
  return validSorts.includes(value ?? '') ? (value as ExploreSort) : fallback;
};

type QueryParamRecord = Record<string, string | string[] | undefined>;

/**
 * URLSearchParams 또는 일반 쿼리 객체를, 탐색 페이지가 허용하는 키(ALLOWED_KEYS)만
 * 남긴 URLSearchParams로 정규화합니다.
 * @param input URLSearchParams 또는 `{ key: value | value[] }` 형태의 쿼리 객체
 * @returns 허용된 키만 남은 URLSearchParams
 * @example const params = toExploreSearchParams({ snapCategory: 'PORTRAIT' });
 */
export const toExploreSearchParams = (input: URLSearchParams | QueryParamRecord) => {
  const source =
    input instanceof URLSearchParams
      ? new URLSearchParams(input.toString())
      : (() => {
          const sp = new URLSearchParams();
          Object.entries(input).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              value.forEach((v) => sp.append(key, v));
              return;
            }
            if (value != null) sp.set(key, value);
          });
          return sp;
        })();

  const next = new URLSearchParams();
  ALLOWED_KEYS.forEach((key) => {
    source.getAll(key).forEach((value) => next.append(key, value));
  });
  return next;
};
