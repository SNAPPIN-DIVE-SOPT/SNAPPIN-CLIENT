'use client';

import { ButtonSearchBar } from '@snappin/design-system';
import { openSearchSheet } from '@/utils/openSearchSheet';

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
  return (
    <ButtonSearchBar
      headline={headline}
      headlineClassName={isPlaceholder ? 'text-black-7' : undefined}
      onClick={() => openSearchSheet(searchSheetKey)}
    />
  );
}
