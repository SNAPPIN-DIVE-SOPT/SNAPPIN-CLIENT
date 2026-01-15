'use client';

import { Navigation } from '@/ui';
import { IconArrowBack, IconHome } from '@/assets';
import { useRouter } from 'next/navigation';

export default function ClientHeader() {
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
      center={<p className='caption-14-bd'>결제 요청</p>}
      right={<IconHome onClick={handleHomeClick} />}
      className='border-b-black-5 border-b-1'
    />
  );
}
