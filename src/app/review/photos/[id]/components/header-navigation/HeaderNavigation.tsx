'use client';

import { useRouter } from 'next/navigation';
import { IconClose } from '@/assets';
import { IconButton, Navigation } from '@/ui';
import { cn } from '@/utils/cn';

type HeaderProps = {
  isVisible: boolean;
};

export default function HeaderNavigation({ isVisible }: HeaderProps) {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <>
      <Navigation
        left={
          <IconButton onClick={handleBackClick} className='text-black-1 h-[2.4rem] w-[2.4rem]'>
            <IconClose />
          </IconButton>
        }
        center={
          <span className='caption-14-bd text-black-1 flex flex-1 text-center'>포토 리뷰</span>
        }
        right={<div className='bg-black-10 h-[2.4rem] w-[2.4rem]' />}
        className={cn(
          'bg-black-10 fixed-center top-0 z-15 flex h-[5rem] items-center justify-between px-[2rem] transition-transform duration-300 ease-out will-change-transform',
          isVisible ? 'pointer-events-auto translate-y-0' : 'pointer-events-none -translate-y-full',
        )}
      />
      <div
        className={cn(
          'bg-black-10 flex-none transition-[height] duration-300 ease-out',
          isVisible ? 'h-[5rem]' : 'h-0',
        )}
      />
    </>
  );
}
