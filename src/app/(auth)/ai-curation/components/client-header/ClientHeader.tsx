'use client';

import { Navigation } from '@/ui'
import { IconClose } from '@/assets'
import { useRouter } from 'next/navigation';

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
  )
}
