'use client';

import { Navigation } from '@/ui';
import Image from 'next/image';
import logo from '@/../public/imgs/logo.png';
import { IconSearch } from '@/assets';
import { cn } from '@/utils/cn';

interface HeaderProps {
  isVisible: boolean;
}

export default function Header({ isVisible }: HeaderProps) {
  const handleClickSearch = () => {
    //TODO: 검색 페이지로 이동
  };

  return (
    <Navigation
      left={<Image src={logo} alt='logo' className='h-full w-auto' />}
      right={<IconSearch onClick={handleClickSearch} />}
      className={cn(
        'transition-all duration-300 ease-out',
        isVisible ? 'pointer-events-auto translate-y-0' : 'pointer-events-none -translate-y-full',
      )}
    />
  );
}
