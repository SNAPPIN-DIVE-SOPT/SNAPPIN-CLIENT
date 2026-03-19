'use client';

import { IconSearch, Logo } from '@snappin/design-system/assets';
import { IconButton, Navigation } from '@snappin/design-system';
import { useRouter } from 'next/navigation';
import { openSearchSheet } from '@/utils/openSearchSheet';
import { ROUTES } from '@/constants/routes/routes';

export default function Header() {
  const router = useRouter();
  const handleNavigateHome = () => router.push(ROUTES.HOME);

  return (
    <Navigation
      className='items-center py-0'
      left={<Logo width={82} className='cursor-pointer' onClick={handleNavigateHome} />}
      right={
        <IconButton aria-label='상품 검색'>
          <IconSearch onClick={() => openSearchSheet()} />
        </IconButton>
      }
    />
  );
}
