'use client';

import { useRouter } from 'next/navigation';
import { Navigation, IconButton } from '@/ui';
import { Logo, IconSearch } from '@/assets';

export default function ClientNavigation() {
  const router = useRouter();

  const handleClickLogo = () => {
    router.push('/');
  };

  const handleSearchClick = () => {
    //TODO: 검색 페이지
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
