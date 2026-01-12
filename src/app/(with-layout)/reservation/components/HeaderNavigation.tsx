'use client';

import { Navigation } from '@/ui';
import { Logo, IconSearch } from '@/assets';

export default function HeaderNavigation() {
  const handleSearchClick = () => {
    //TODO: 검색 페이지
  };

  return (
    <Navigation
      isFixed={true}
      left={<Logo width={72} />}
      right={<IconSearch onClick={handleSearchClick} />}
    />
  );
}
