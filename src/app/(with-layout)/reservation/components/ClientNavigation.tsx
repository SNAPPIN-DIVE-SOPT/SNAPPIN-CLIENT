'use client';

import { Navigation } from '@/ui';
import { Logo, IconSearch } from '@/assets';

export default function ClientNavigation() {
  const handleSearchClick = () => {
    //TODO: 검색 페이지
  };

  return (
    <Navigation
      isSticky={false}
      left={<Logo width={72} />}
      right={<IconSearch onClick={handleSearchClick} />}
    />
  );
}
