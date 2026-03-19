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
          aria-label='?댁쟾 ?섏씠吏濡??대룞'
          onClick={handleGoBack}
        >
          <IconArrowBack />
        </IconButton>
      }
      center={<span className='font-16-md text-black-10 flex flex-1 text-center'>?묎? ?곸꽭</span>}
      right={
        <IconButton
          className='h-[2.4rem] w-[2.4rem]'
          aria-label='?덉쑝濡??대룞'
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
