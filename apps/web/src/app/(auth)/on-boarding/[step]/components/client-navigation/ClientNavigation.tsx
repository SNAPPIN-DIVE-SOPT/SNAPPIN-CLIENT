'use client';

import { useParams, useRouter } from 'next/navigation';
import { IconArrowBack } from '@snappin/design-system/assets';
import { Navigation } from '@snappin/design-system';

export default function ClientNavigation() {
  const router = useRouter();
  const params = useParams<{ step: string }>();
  const isFirstStep = params.step === '1';

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Navigation
      isFixed={true}
      left={isFirstStep ? undefined : <IconArrowBack onClick={handleBackClick} />}
    />
  );
}
