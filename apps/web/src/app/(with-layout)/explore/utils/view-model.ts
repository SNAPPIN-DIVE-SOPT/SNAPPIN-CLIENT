import { INITIAL_MAX_PRICE, INITIAL_MIN_PRICE } from '../constants/price';
import { EXPLORE_TAB, ExploreTab } from '../constants/tab';
import { parseInitialDraft, parsePriceRange } from './query';

const PLACEHOLDER_HEADLINE = '탐색을 시작해 보세요';

const formatPriceSummary = (minPrice: number, maxPrice: number) => {
  const minInManwon = minPrice / 10_000;
  const maxInManwon = maxPrice / 10_000;

  return `${minInManwon}만원 ~ ${maxInManwon}만원`;
};

export const resolveExploreTab = (
  value: string | null | undefined,
  fallback: ExploreTab = EXPLORE_TAB.PORTFOLIO,
): ExploreTab => {
  if (value === EXPLORE_TAB.PORTFOLIO || value === EXPLORE_TAB.PRODUCT) return value;
  return fallback;
};

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
