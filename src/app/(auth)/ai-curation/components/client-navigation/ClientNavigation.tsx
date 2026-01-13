'use client';

import { useRouter } from 'next/navigation';
import { IconClose } from '@/assets';
import { Navigation } from '@/ui';

export default function ClientNavigation() {
  const router = useRouter();

  const handleCloseClick = () => {
    router.back();
  };

  return (
    <Navigation
      isFixed={true}
      right={<IconClose onClick={handleCloseClick} className='text-black-1' />}
      className='bg-black-10'
    />
  );
}
