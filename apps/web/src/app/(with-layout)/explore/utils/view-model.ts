import { SNAP_CATEGORY } from '@/constants/categories/snap-category';
import { EXPLORE_TAB, ExploreTab } from '../constants/tab';
import { parseInitialDraft } from './query';

const formatDateDot = (raw: string | null | undefined) => {
  if (!raw) return null;
  return raw.replaceAll('-', '/');
};

const formatPeople = (count: number | null | undefined) => {
  if (!count || count <= 0) return null;
  return `${count}인`;
};

export const resolveExploreTab = (
  value: string | null | undefined,
  fallback: ExploreTab = EXPLORE_TAB.PORTFOLIO,
): ExploreTab => {
  if (value === EXPLORE_TAB.PORTFOLIO || value === EXPLORE_TAB.PRODUCT) return value;
  return fallback;
};

export const getExploreSearchBarText = (sp: URLSearchParams) => {
  const { snapCategory, placeName, date, peopleCount } = parseInitialDraft(sp);
  const snapCategoryLabel = SNAP_CATEGORY[snapCategory as keyof typeof SNAP_CATEGORY] ?? null;
  const normalizedPlaceName = placeName?.trim() ? placeName.trim() : null;
  const formattedDate = formatDateDot(date);
  const formattedPeople = formatPeople(peopleCount);

  const isAllEmpty =
    !snapCategoryLabel && !normalizedPlaceName && !formattedDate && !formattedPeople;

  if (isAllEmpty) {
    return {
      headline: '어떤 스냅 작가를 찾고 있나요?',
      supportingText: '날짜, 스냅 종류, 지역 기반으로 정교한 검색',
    };
  }

  return {
    headline: `${snapCategoryLabel ?? '전체 스냅'}, ${normalizedPlaceName ?? '전체 장소'}`,
    supportingText: `${formattedDate ?? '전체 날짜'}, ${formattedPeople ?? '전체 인원'}`,
  };
};
