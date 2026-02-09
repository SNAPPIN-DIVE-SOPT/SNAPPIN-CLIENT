'use client';

import { IconButton, Navigation } from '@/ui';
import { useRouter } from 'next/navigation';
import { IconSearch, Logo } from '@/assets';

export default function ClientHeader() {
  const router = useRouter();

  const handleClickLogo = () => {
  };

  const handleSearchClick = () => {
    router.push('/explore');
  };

  return (
    <Navigation
      left={<Logo width={82} onClick={handleClickLogo} />}
      right={
        <IconButton onClick={handleSearchClick}>
          <IconSearch className='h-[2.4rem] w-[2.4rem]' />
        </IconButton>
      }
      isFixed
    />
  );
}
