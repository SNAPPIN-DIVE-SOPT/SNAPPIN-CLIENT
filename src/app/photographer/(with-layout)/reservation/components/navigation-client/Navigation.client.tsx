'use client';

import { Navigation } from '@/ui';
import { Logo, IconSearch } from '@/assets';
import { openSearchSheet } from '@/utils/openSearchSheet';

export default function NavigationClient() {
  return (
    <Navigation
      isFixed={true}
      left={<Logo width={82} />}
      right={<IconSearch onClick={openSearchSheet} />}
    />
  );
}
