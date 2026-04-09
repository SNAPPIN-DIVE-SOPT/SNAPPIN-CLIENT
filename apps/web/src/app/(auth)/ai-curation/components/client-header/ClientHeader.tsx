'use client';

import { useRouter } from 'next/navigation';
import { Navigation } from '@snappin/design-system';
import { IconClose } from '@snappin/design-system/assets';

export default function ClientHeader() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Navigation
      right={<IconClose onClick={handleBackClick} className='text-black-1' />}
      isFixed
      className='bg-black-10'
    />
  );
}
