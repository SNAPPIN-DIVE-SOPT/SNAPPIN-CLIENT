'use client';

import { useRouter } from 'next/navigation';
import { IconArrowBack, IconHome } from '@snappin/design-system/assets';
import { IconButton, Navigation } from '@snappin/design-system';
import { ROUTES } from '@/constants/routes/routes';

type ClientNavigationProps = {
  title: string;
};

export default function ClientNavigation({ title }: ClientNavigationProps) {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push(ROUTES.HOME);
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Navigation
      left={
        <IconButton onClick={handleBackClick} className='h-[2.4rem] w-[2.4rem]'>
          <IconArrowBack />
        </IconButton>
      }
      center={<span className='font-16-bd text-black-10 flex flex-1 text-center'>{title}</span>}
      right={
        <IconButton onClick={handleHomeClick} className='h-[2.4rem] w-[2.4rem]'>
          <IconHome />
        </IconButton>
      }
      isFixed={true}
      className='border-black-5 border-b'
    />
  );
}
