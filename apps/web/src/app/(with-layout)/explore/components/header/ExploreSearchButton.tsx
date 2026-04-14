'use client';

import { ButtonSearchBar } from '@snappin/design-system';
import { ALLOWED_KEYS } from '@/app/(with-layout)/explore/constants/query';
import {
  INITIAL_MAX_PRICE,
  INITIAL_MIN_PRICE,
} from '@/app/(with-layout)/explore/constants/price';
import { useQueryParams } from '@/hooks/useSearchQuery';
import { ROUTES } from '@/constants/routes/routes';
import { openSearchSheet } from '@/utils/openSearchSheet';

const SEARCH_CONDITION_KEYS = [
  'snapCategory',
  'placeId',
  'placeName',
  'date',
  'peopleCount',
] as const;

type ExploreSearchButtonProps = {
  headline: string;
  isPlaceholder: boolean;
  searchSheetKey: string;
};

export default function ExploreSearchButton({
  headline,
  isPlaceholder,
  searchSheetKey,
}: ExploreSearchButtonProps) {
  const { read, patch, navigate, searchParams } = useQueryParams(ALLOWED_KEYS);
  const minPrice = read.get('minPrice', '');
  const maxPrice = read.get('maxPrice', '');
  const hasCustomPriceRange =
    (minPrice !== '' && Number(minPrice) !== INITIAL_MIN_PRICE) ||
    (maxPrice !== '' && Number(maxPrice) !== INITIAL_MAX_PRICE);
  const hasActiveSearchCondition =
    hasCustomPriceRange || SEARCH_CONDITION_KEYS.some((key) => read.get(key, '') !== '');

  const handleResetSearchConditions = () => {
    const nextParams = patch(
      {
        minPrice: null,
        maxPrice: null,
        snapCategory: null,
        placeId: null,
        placeName: null,
        date: null,
        peopleCount: null,
      },
      searchParams,
    );

    navigate(nextParams, { basePath: ROUTES.EXPLORE() });
  };

  return (
    <ButtonSearchBar
      headline={headline}
      headlineClassName={isPlaceholder ? 'text-black-7' : undefined}
      onClick={() => openSearchSheet(searchSheetKey)}
      onClearAction={hasActiveSearchCondition ? handleResetSearchConditions : undefined}
    />
  );
}
