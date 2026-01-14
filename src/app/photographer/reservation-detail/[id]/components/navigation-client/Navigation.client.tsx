'use client';

import { Navigation } from '@/ui';
import { IconArrowBack, IconHome } from '@/assets';
import { useRouter } from 'next/navigation';

export default function NavigationClient() {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push('/');
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Navigation
      isFixed={true}
      left={<IconArrowBack onClick={handleBackClick} />}
      right={<IconHome onClick={handleHomeClick} />}
      className='border-b-black-5 border-b-1'
    />
  );
}
