'use client';

import { Navigation } from '@snappin/design-system';
import { Logo, IconSearch } from '@snappin/design-system/assets';
import { openSearchSheet } from '@/utils/openSearchSheet';

export default function NavigationClient() {
  return (
    <Navigation
      isFixed={true}
      left={<Logo width={82} />}
      right={<IconSearch onClick={() => openSearchSheet()} />}
    />
  );
}
