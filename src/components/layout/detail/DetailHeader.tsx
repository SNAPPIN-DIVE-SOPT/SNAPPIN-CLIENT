'use client';

import { useRouter } from 'next/navigation';
import { Navigation, IconButton } from '@/ui';
import { IconArrowBack, IconHome } from '@/assets';
import { ROUTES } from '@/constants/routes/routes';

type HeaderProps = {
  children: React.ReactNode;
}

export default function DetailHeader({ children }: HeaderProps) {
  const router = useRouter();
  const handleGoBack = () => router.back();
  const handleGoHome = () => router.push(ROUTES.HOME);

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
      center={<span className='font-16-bd text-black-10 flex flex-1 text-center'>{children}</span>}
      right={
        <IconButton
          className='h-[2.4rem] w-[2.4rem]'
          aria-label='홈으로 이동'
          onClick={handleGoHome}
        >
          <IconHome />
        </IconButton>
      }
      className='border-b-black-5 flex h-[5rem] items-center justify-between border-b-1 px-[2rem]'
      isFixed={true}
    />
  );
}
