'use client';

import { Navigation } from '@/ui';
import { IconArrowBack, IconHome } from '@/assets';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes/routes';

export default function NavigationClient() {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push(ROUTES.HOME);
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Navigation
      isFixed={true}
      left={<IconArrowBack onClick={handleBackClick} />}
      center={<p className='font-16-bd'>촬영 내역</p>}
      right={<IconHome onClick={handleHomeClick} />}
      className='border-b-black-5 border-b-1'
    />
  );
}
