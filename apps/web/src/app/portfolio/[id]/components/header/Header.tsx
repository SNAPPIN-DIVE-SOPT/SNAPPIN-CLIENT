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
  };

  return (
    <Navigation
      left={
        <IconButton
          className='h-[2.4rem] w-[2.4rem]'
          aria-label='이전 페이지로 이동'
          onClick={handleGoBack}
        >
          <IconArrowBack />
        </IconButton>
      }
      center={
        <span className='font-16-sb text-black-10 flex flex-1 text-center'>포트폴리오 상세</span>
      }
      right={
        <IconButton
          className='h-[2.4rem] w-[2.4rem]'
          aria-label='홈으로 이동'
          onClick={handleGoHome}
        >
          <IconHome />
        </IconButton>
      }
      className='border-b-black-5 z-20 flex h-[5rem] items-center justify-between border-b-1 px-[2rem]'
      isFixed={true}
    />
  );
}
