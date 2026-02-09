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
        <IconButton
          className='flex h-[4.4rem] w-[4.4rem] items-center gap-[1rem]'
          onClick={handleGoBack}
        >
          <IconArrowBack />
        </IconButton>
      }
      center={<h1 className='font-16-bd text-black-10 flex-1 text-center'>상품 상세</h1>}
      right={
        <IconButton
          className='flex h-[4.4rem] w-[4.4rem] items-center justify-end gap-[1rem]'
          onClick={handleGoHome}
        >
          <IconHome />
        </IconButton>
      }
      className='border-b-black-5 bg-black-1 z-20 flex items-center justify-between border-b-1 px-[2rem] py-[0.3rem]'
      isFixed={true}
    />
  );
}
