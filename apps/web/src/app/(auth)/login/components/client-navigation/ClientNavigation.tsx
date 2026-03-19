'use client';

import { useRouter } from 'next/navigation';
import { IconArrowBack } from '@snappin/design-system/assets';
import { Navigation } from '@snappin/design-system';

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
      center={<span className='text-black-1 font-16-bd'>로그인</span>}
    />
  );
}
