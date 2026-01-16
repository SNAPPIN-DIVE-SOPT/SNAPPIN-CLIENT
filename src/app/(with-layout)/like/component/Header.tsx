'use client';

import { IconSearch, Logo } from '@/assets';
import { IconButton, Navigation } from '@/ui';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const handleNavigateHome = () => router.push('/');

  // todo: 검색창 구현 후 이벤트 핸들링
  const handleNavigateSearch = () => {};

  return (
    <Navigation
      className='items-center py-0'
      left={<Logo width={82} className='cursor-pointer' onClick={handleNavigateHome} />}
      right={
        <IconButton aria-label='상품 검색'>
          <IconSearch onClick={handleNavigateSearch} />
        </IconButton>
      }
    />
  );
}
