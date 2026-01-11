'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';
import { Navigation, IconButton } from '@/ui';
import { IconArrowBack, IconHome } from '@/assets';

type HeaderProps = {
  isVisible: boolean;
}

export default function Header({ isVisible }: HeaderProps) {
  const router = useRouter();

  const handleClickLeft = () => {
    router.back();
  }

  const handleClickRight = () => {
    router.push('/');
  }

  return (
    <div
      className={cn(
        'fixed-center top-0 z-15 transition-transform duration-300 ease-out will-change-transform',
        !isVisible ? 'pointer-events-auto translate-y-0' : 'pointer-events-none -translate-y-full',
      )}
    >
      <Navigation
        left={
          <IconButton className='w-[2.4rem] h-[2.4rem]' onClick={handleClickLeft}>
            <IconArrowBack />
          </IconButton>
        }
        center={
          <span className='flex flex-1 text-center caption-14-bd text-black-10'>
            포트폴리오 상세
          </span>
        }
        right={
          <IconButton className='w-[2.4rem] h-[2.4rem]' onClick={handleClickRight}>
            <IconHome />
          </IconButton>
        }
        className='flex justify-between items-center h-[5rem] px-[2rem]'
      />
    </div>
  );
}