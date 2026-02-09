'use client';

import { useRouter } from 'next/navigation';
import { Navigation } from '@/ui';
import { IconClose } from '@/assets';

export default function Header() {
  const router = useRouter();

  const handleClose = () => router.back();

  return (
    <Navigation
      isFixed={true}
      right={<IconClose onClick={handleClose} className='text-black-1' />}
      center={<p className='caption-14-bd text-black-1'>포토 리뷰</p>}
      className='bg-black-10 border-black-8 border-b'
    />
  );
}
