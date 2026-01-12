'use client';

import { useRouter } from 'next/navigation';
import { IconArrowBack, IconHome } from '@/assets';
import { IconButton, Navigation } from '@/ui';
import { cn } from '@/utils/cn';

type HeaderProps = {
  isVisible: boolean;
};

export default function HeaderNavigation({ isVisible }: HeaderProps) {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push('/');
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <>
      <Navigation
        left={
          <IconButton onClick={handleBackClick} className='h-[2.4rem] w-[2.4rem]'>
            <IconArrowBack />
          </IconButton>
        }
        center={
          <span className='caption-14-bd text-black-10 flex flex-1 text-center'>예약 상세</span>
        }
        right={
          <IconButton onClick={handleHomeClick} className='h-[2.4rem] w-[2.4rem]'>
            <IconHome />
          </IconButton>
        }
        className={cn(
          'fixed-center top-0 z-15 flex h-[5rem] items-center justify-between px-[2rem] transition-transform duration-300 ease-out will-change-transform',
          !isVisible ? 'pointer-events-auto translate-y-0' : 'pointer-events-none -translate-y-full',
        )}
      />
      <div className='bg-black-1 h-[5rem] flex-none' />
    </>
  );
}
