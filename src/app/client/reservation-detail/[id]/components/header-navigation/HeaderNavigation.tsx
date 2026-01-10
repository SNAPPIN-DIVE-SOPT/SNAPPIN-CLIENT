'use client';

import { IconArrowBack, IconHome } from '@/assets';
import { Navigation } from '@/ui';
import { useRouter } from 'next/navigation';

type HeaderNavigationProps = {
  title?: string;
};

export default function HeaderNavigation({ title = '예약 상세' }: HeaderNavigationProps) {
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
      center={title}
      right={<IconHome onClick={handleHomeClick} />}
      className='caption-14-bd text-black-10'
    />
  );
}
