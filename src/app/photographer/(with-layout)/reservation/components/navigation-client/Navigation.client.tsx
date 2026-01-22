'use client';

import { Navigation } from '@/ui';
import { Logo, IconSearch } from '@/assets';
import { useRouter } from 'next/navigation';

export default function NavigationClient() {
  const router = useRouter();
  const handleSearchClick = () => {
    router.push('/explore');
  };

  return (
    <Navigation
      isFixed={true}
      left={<Logo width={82} />}
      right={<IconSearch onClick={handleSearchClick} />}
    />
  );
}
