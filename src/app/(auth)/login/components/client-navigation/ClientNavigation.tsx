'use client';

import { useRouter } from 'next/navigation';
import { IconArrowBack } from '@/assets';
import { Navigation } from '@/ui';

export default function ClientNavigation() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Navigation
      isFixed={true}
      left={<IconArrowBack onClick={handleBackClick} />}
      className='text-black-1 bg-black-10'
      center={<span className='text-black-1 caption-14-bd'>로그인</span>}
    />
  );
}
