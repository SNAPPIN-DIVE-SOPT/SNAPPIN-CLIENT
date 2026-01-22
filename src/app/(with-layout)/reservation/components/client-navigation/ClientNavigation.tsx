'use client';

import { useRouter } from 'next/navigation';
import { Navigation, IconButton } from '@/ui';
import { Logo, IconSearch } from '@/assets';
import { openSearchSheet } from '@/utils/openSearchSheet';

export default function ClientNavigation() {
  const router = useRouter();

  const handleClickLogo = () => {
    router.push('/');
  };

  return (
    <Navigation
      left={
        <IconButton>
          <Logo width={82} onClick={handleClickLogo} />
        </IconButton>
      }
      right={
        <IconButton onClick={openSearchSheet}>
          <IconSearch className='h-[2.4rem] w-[2.4rem]' />
        </IconButton>
      }
      isFixed
    />
  );
}
