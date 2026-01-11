'use client';

import { Navigation } from '@/ui';
import { Logo, IconSearch } from '@/assets';

export default function NavigationClient() {
  const handleSearchClick = () => {
    //TODO: 검색 페이지로 이동
  };

  return (
    <Navigation
      isFixed={true}
      left={<Logo width={72} />}
      right={<IconSearch onClick={handleSearchClick} />}
    />
  );
}
