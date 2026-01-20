'use client';

import { useRouter } from 'next/navigation';
import { Navigation, IconButton } from '@/ui';
import { IconArrowBack, IconHome } from '@/assets';

export default function Header() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  }

  const handleGoHome = () => {
    router.push('/');
  }

  return (
    <Navigation
      left={
        <IconButton className='w-[2.4rem] h-[2.4rem]' onClick={handleGoBack}>
          <IconArrowBack />
        </IconButton>
      }
      center={
        <span className='flex flex-1 text-center caption-14-bd text-black-10'>포트폴리오 상세</span>
      }
      right={
        <IconButton className='w-[2.4rem] h-[2.4rem]' onClick={handleGoHome}>
          <IconHome />
        </IconButton>
      }
      className='flex justify-between items-center h-[5rem] px-[2rem] border-b-1 border-b-black-5 z-20'
      isFixed={true}
    />
  );
}