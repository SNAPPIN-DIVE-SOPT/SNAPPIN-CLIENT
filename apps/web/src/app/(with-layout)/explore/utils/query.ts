import { SnapCategory } from '@/constants/categories/snap-category';
import { EXPLORE_SORT, ExploreSort } from '@/app/(with-layout)/explore/constants/sort';
import { ALLOWED_KEYS } from '@/app/(with-layout)/explore/constants/query';
import { MAX_PRICE, MIN_PRICE } from '@/app/(with-layout)/explore/constants/price';

const parseNumberParam = (value: string | null) => {
  if (value === null || value === '') return null;

  const parsedNumber = Number(value);
  return Number.isNaN(parsedNumber) ? null : parsedNumber;
};

export const parseMoodIds = (sp: URLSearchParams) => {
  const rawMoodIds = sp.get('moodIds');
  if (!rawMoodIds) return [];

  return rawMoodIds
    .split(',')
    .map((value) => Number(value))
    .filter((value) => Number.isInteger(value) && value > 0);
};

export const parsePriceRange = (sp: URLSearchParams): [number, number] => {
  const minPrice = parseNumberParam(sp.get('minPrice')) ?? MIN_PRICE;
  const maxPrice = parseNumberParam(sp.get('maxPrice')) ?? MAX_PRICE;

  if (minPrice > maxPrice) return [MIN_PRICE, MAX_PRICE];

  return [minPrice, maxPrice];
};

export const parseInitialDraft = (sp: URLSearchParams) => {
  const snapCategory = sp.get('snapCategory') as SnapCategory;
  const placeId = sp.get('placeId');
  const placeName = sp.get('placeName');
  const date = sp.get('date');
  const peopleCount = parseNumberParam(sp.get('peopleCount'));

  return { snapCategory, placeId, date, peopleCount, placeName };
};

export const resolveExploreSort = (
  value: string | null | undefined,
  fallback: ExploreSort = EXPLORE_SORT.RECOMMENDED,
): ExploreSort => {
  const validSorts = Object.values(EXPLORE_SORT) as string[];
  return validSorts.includes(value ?? '') ? (value as ExploreSort) : fallback;
};

type QueryParamRecord = Record<string, string | string[] | undefined>;

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
