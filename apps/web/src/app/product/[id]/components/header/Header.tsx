'use client';

import { useRouter } from 'next/navigation';
import { Navigation, IconButton } from '@snappin/design-system';
import { IconArrowBack, IconHome } from '@snappin/design-system/assets';
import { ROUTES } from '@/constants/routes/routes';

export default function Header() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push(ROUTES.HOME);
    sessionStorage.removeItem('home-scroll');
  };

  return (
    <Navigation
      left={
        <IconButton
          className='flex h-[4.4rem] w-[4.4rem] items-center gap-[1rem]'
          onClick={handleGoBack}
          aria-label='이전 페이지로 이동'
        >
          <IconArrowBack />
        </IconButton>
      }
      center={<h1 className='font-16-bd text-black-10 flex-1 text-center'>상품 상세</h1>}
      right={
        <IconButton
          className='flex h-[4.4rem] w-[4.4rem] items-center justify-end gap-[1rem]'
          onClick={handleGoHome}
          aria-label='홈으로 이동'
        >
          <IconHome />
        </IconButton>
      }
      className='border-b-black-5 bg-black-1 z-20 flex items-center justify-between border-b-1 px-[2rem] py-[0.3rem]'
      isFixed={true}
    />
  );
}
