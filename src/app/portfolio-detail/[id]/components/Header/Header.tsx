'use client';

import { useRouter } from 'next/navigation';
import { Navigation, IconButton } from '@/ui';
import { IconArrowBack, IconHome } from '@/assets';

export default function Header() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push('/');
    sessionStorage.removeItem('home-scroll');
  };

  return (
    <Navigation
      left={
        <IconButton className='h-[2.4rem] w-[2.4rem]' onClick={handleGoBack}>
          <IconArrowBack />
        </IconButton>
      }
      center={
        <span className='font-16-bd text-black-10 flex flex-1 text-center'>포트폴리오 상세</span>
      }
      right={
        <IconButton className='h-[2.4rem] w-[2.4rem]' onClick={handleGoHome}>
          <IconHome />
        </IconButton>
      }
      className='border-b-black-5 z-20 flex h-[5rem] items-center justify-between border-b-1 px-[2rem]'
      isFixed={true}
    />
  );
}
