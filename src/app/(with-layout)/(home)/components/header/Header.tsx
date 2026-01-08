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
        'fixed-center top-0 z-50',
        'transition-transform duration-200',
        isVisible ? 'translate-y-0' : '-translate-y-full',
      )}
    >
      <Navigation left={<Logo width={72} />} right={<IconSearch onClick={handleClickSearch} />} />
    </div>
  );
}
