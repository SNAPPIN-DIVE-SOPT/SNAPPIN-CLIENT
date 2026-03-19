'use client';

import { Navigation } from '@snappin/design-system';
import { IconArrowBack, IconHome } from '@snappin/design-system/assets';
import { useRouter } from 'next/navigation';

export default function NavigationClient() {
  const router = useRouter();

  const handleHomeClick = () => {};

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Navigation
      isFixed={true}
      left={<IconArrowBack onClick={handleBackClick} />}
      center={<span className='font-16-bd'>?덉빟 ?곸꽭</span>}
      right={<IconHome onClick={handleHomeClick} />}
      className='border-b-black-5 border-b-1'
    />
  );
}
