import { INITIAL_MAX_PRICE, INITIAL_MIN_PRICE } from '../constants/price';
import { EXPLORE_TAB, ExploreTab } from '../constants/tab';
import { parseInitialDraft, parsePriceRange } from './query';

const PLACEHOLDER_HEADLINE = '탐색을 시작해 보세요';

const formatPriceSummary = (minPrice: number, maxPrice: number) => {
  const minInManwon = minPrice / 10_000;
  const maxInManwon = maxPrice / 10_000;

  return `${minInManwon}만원 ~ ${maxInManwon}만원`;
};

/**
 * 쿼리 파라미터 값을 유효한 탐색 탭 값으로 변환합니다.
 * @param value 쿼리에서 읽은 원본 값
 * @param fallback 유효하지 않을 때 사용할 기본 탭 (기본값: PORTFOLIO)
 * @returns 유효한 ExploreTab 값
 * @example const tab = resolveExploreTab(searchParams.get('tab'));
 */
export const resolveExploreTab = (
  value: string | null | undefined,
  fallback: ExploreTab = EXPLORE_TAB.PORTFOLIO,
): ExploreTab => {
  if (value === EXPLORE_TAB.PORTFOLIO || value === EXPLORE_TAB.PRODUCT) return value;
  return fallback;
};

/**
 * 현재 검색 조건(장소, 가격 범위)을 검색창에 보여줄 요약 문구로 변환합니다.
 * @param sp 현재 URL의 쿼리 파라미터
 * @returns 검색창에 표시할 문구와, 아직 조건이 없어 플레이스홀더인지 여부
 * @example const { headline, isPlaceholder } = getExploreSearchBarText(searchParams);
 */
export const getExploreSearchBarText = (sp: URLSearchParams) => {
  const { placeName } = parseInitialDraft(sp);
  const [minPrice, maxPrice] = parsePriceRange(sp);
  const normalizedPlaceName = placeName?.trim() ? placeName.trim() : null;
  const hasCustomPriceRange =
    minPrice !== INITIAL_MIN_PRICE || maxPrice !== INITIAL_MAX_PRICE;
  const priceSummary = hasCustomPriceRange ? formatPriceSummary(minPrice, maxPrice) : null;
  const headlineParts = [normalizedPlaceName, priceSummary].filter(
    (value): value is string => Boolean(value),
  );

  if (headlineParts.length === 0) {
    return {
      headline: PLACEHOLDER_HEADLINE,
      isPlaceholder: true,
    };
  }

  return {
    headline: headlineParts.join(', '),
    isPlaceholder: false,
  };
};
