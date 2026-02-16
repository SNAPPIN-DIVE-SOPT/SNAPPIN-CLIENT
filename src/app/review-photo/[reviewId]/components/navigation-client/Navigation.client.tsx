'use client';

import { useRouter } from 'next/navigation';
import { Navigation } from '@/ui';
import { IconClose } from '@/assets';

export default function NavigationClient() {
  const router = useRouter();

  const handleClickClose = () => {
    router.back();
  };

  return (
    <Navigation
      isFixed
      right={<IconClose onClick={handleClickClose} className='text-black-1' />}
      center={<p className='font-16-bd text-black-1'>포토 리뷰</p>}
      className='bg-black-10 border-black-8 border-b'
    />
  );
}
