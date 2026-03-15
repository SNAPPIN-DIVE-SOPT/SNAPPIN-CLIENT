'use client';

import { IconButton, Navigation } from '@snappin/design-system';
import { useRouter } from 'next/navigation';
import { IconSearch, Logo } from '@snappin/design-system/assets';
import { openSearchSheet } from '@/utils/openSearchSheet';
import { ROUTES } from '@/constants/routes/routes';

export default function ClientHeader() {
  const router = useRouter();

  const handleClickLogo = () => {
    router.push(ROUTES.HOME);
  };

  return (
    <Navigation
      left={<Logo width={82} onClick={handleClickLogo} />}
      right={
        <IconButton onClick={() => openSearchSheet()}>
          <IconSearch className='h-[2.4rem] w-[2.4rem]' />
        </IconButton>
      }
      isFixed
    />
  );
}
