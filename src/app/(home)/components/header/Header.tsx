'use client';

import { useContext } from 'react';
import { Navigation } from '@/ui';
import Image from 'next/image';
import logo from '@/../public/imgs/logo.png';
import { IconSearch } from '@/assets';
import { cn } from '@/utils/cn';
import { NavVisibleContext } from '@/hooks/useNavVisibility';

export default function Header() {
  const isVisible = useContext(NavVisibleContext);

  const handleClickSearch = () => {
    //TODO: 검색 페이지로 이동
  };

  return (
    <Navigation
      left={<Image src={logo} alt='logo' className='h-full w-auto' />}
      right={<IconSearch onClick={handleClickSearch} />}
      className={cn(
        'fixed top-0 left-1/2 -translate-x-1/2 transition-all duration-300 ease-out',
        isVisible ? 'pointer-events-auto translate-y-0' : 'pointer-events-none -translate-y-full',
      )}
    />
  );
}
