'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { IconArrowBack } from '@snappin/design-system/assets';
import { Navigation } from '@snappin/design-system';
import { ROUTES } from '@/constants/routes/routes';

export default function ClientNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ step?: string }>();

  const isBackHidden = params.step === '1' || pathname === ROUTES.ON_BOARDING_FINAL;

  const handleBackClick = () => {
    const currentStep = Number(params.step);

    if (!Number.isFinite(currentStep) || currentStep <= 1) {
      router.push(ROUTES.ON_BOARDING(1));
      return;
    }

    router.push(ROUTES.ON_BOARDING(currentStep - 1));
  };

  return (
    <Navigation
      isFixed={true}
      left={isBackHidden ? undefined : <IconArrowBack onClick={handleBackClick} />}
    />
  );
}
