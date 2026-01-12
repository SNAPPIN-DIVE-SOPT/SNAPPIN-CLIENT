'use client';

import { IconSearch, Logo } from '@/assets';
import { Navigation } from '@/ui';
import { cn } from '@/utils/cn';

type HeaderNavigationProps = {
  isVisible: boolean;
};

export default function HeaderNavigation({ isVisible }: HeaderNavigationProps) {
  const handleSearchClick = () => {
    // 검색페이지
  };

  return (
    <>
      <Navigation
        left={<Logo width={72} />}
        right={<IconSearch onClick={handleSearchClick} />}
        className={cn(
          'fixed-center top-0 z-15 flex h-[5rem] items-center justify-between px-[2rem] transition-transform duration-300 ease-out will-change-transform',
          isVisible ? 'pointer-events-auto translate-y-0' : 'pointer-events-none -translate-y-full',
        )}
      />
      <div
        className={cn(
          'bg-black-1 flex-none transition-[height] duration-300 ease-out',
          isVisible ? 'h-[5rem]' : 'h-0',
        )}
      />
    </>
  );
}
