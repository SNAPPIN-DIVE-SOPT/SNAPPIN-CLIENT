'use client';

import { useRouter } from 'next/navigation';
import { IconSearch, Logo } from '@/assets';
import { Navigation } from '@/ui';

export default function ClientNavigation() {
  const router = useRouter();

  const handleSearchClick = () => {
    //TODO: 검색 페이지로 이동
    router.push('/');
  };

  return (
    <Navigation
      isFixed={true}
      left={<Logo width={72} />}
      right={<IconSearch onClick={handleSearchClick} />}
    />
  );
}
