'use client';

import { IconButton, Navigation } from '@/ui';
import { useRouter } from 'next/navigation';
import { IconSearch, Logo } from '@/assets';

export default function ClientHeader() {
  const router = useRouter();

  const handleClickLogo = () => {
    router.push('/');
  };

  const handleSearchClick = () => {
    // TODO: 검색 페이지로 이동
  };

  return (
    <Navigation
      left={<Logo width={72} onClick={handleClickLogo} />}
      right={
        <IconButton onClick={handleSearchClick}>
          <IconSearch className='h-[2.4rem] w-[2.4rem]' />
        </IconButton>
      }
      isFixed
    />
  );
}
