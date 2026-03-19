'use client';

import { ButtonSearchBar } from '@snappin/design-system';
import { openSearchSheet } from '@/utils/openSearchSheet';

type ExploreSearchButtonProps = {
  headline: string;
  supportingText?: string;
  supportingTextClassName?: string;
  searchSheetKey: string;
};

export default function ExploreSearchButton({
  headline,
  supportingText,
  supportingTextClassName,
  searchSheetKey,
}: ExploreSearchButtonProps) {
  return (
    <ButtonSearchBar
      headline={headline}
      supportingText={supportingText}
      supportingTextClassName={supportingTextClassName}
      onClick={() => openSearchSheet(searchSheetKey)}
    />
  );
}
