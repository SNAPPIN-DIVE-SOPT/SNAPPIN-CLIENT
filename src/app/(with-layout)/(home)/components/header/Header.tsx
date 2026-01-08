'use client';

import { Navigation } from '@/ui';
import { IconSearch, Logo } from '@/assets';
import { cn } from '@/utils/cn';

interface HeaderProps {
  isVisible: boolean;
}

export default function Header({ isVisible }: HeaderProps) {
  const handleClickSearch = () => {
    //TODO: 검색 페이지로 이동
  };

  return (
    <div
      className={cn(
        'fixed-center top-0 z-15 transition-transform duration-300 ease-out will-change-transform',
        isVisible ? 'pointer-events-auto translate-y-0' : 'pointer-events-none -translate-y-full',
      )}
    >
      <Navigation left={<Logo width={72} />} right={<IconSearch onClick={handleClickSearch} />} />
    </div>
  );
}
