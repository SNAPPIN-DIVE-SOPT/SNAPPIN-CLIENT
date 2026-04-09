'use client';

import { useRouter } from 'next/navigation';
import { Navigation, IconButton } from '@snappin/design-system';
import { Logo, IconSearch } from '@snappin/design-system/assets';
import { openSearchSheet } from '@/utils/openSearchSheet';
import { ROUTES } from '@/constants/routes/routes';

export default function ClientNavigation() {
  const router = useRouter();

  const handleClickLogo = () => {
    router.push(ROUTES.HOME);
  };

  return (
    <Navigation
      left={
        <IconButton>
          <Logo width={82} onClick={handleClickLogo} />
        </IconButton>
      }
      right={
        <IconButton onClick={() => openSearchSheet()}>
          <IconSearch className='h-[2.4rem] w-[2.4rem]' />
        </IconButton>
      }
      isFixed
    />
  );
}
