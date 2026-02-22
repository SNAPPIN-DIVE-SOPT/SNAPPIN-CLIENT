'use client';

import { Navigation } from '@/ui';
import { IconArrowBack, IconHome } from '@/assets';
import { useRouter } from 'next/navigation';

export default function NavigationClient() {
  const router = useRouter();

  const handleHomeClick = () => {};

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Navigation
      isFixed={true}
      left={<IconArrowBack onClick={handleBackClick} />}
      center={<span className='font-16-bd'>예약 상세</span>}
      right={<IconHome onClick={handleHomeClick} />}
      className='border-b-black-5 border-b-1'
    />
  );
}
