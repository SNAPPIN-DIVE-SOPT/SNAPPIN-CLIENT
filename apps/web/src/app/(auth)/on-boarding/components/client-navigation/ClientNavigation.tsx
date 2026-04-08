'use client';

import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IconArrowBack } from '@snappin/design-system/assets';
import { Navigation } from '@snappin/design-system';
import { buildReturnToParams, readReturnToContext } from '@/auth/utils/returnTo';
import { ROUTES } from '@/constants/routes/routes';

export default function ClientNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ step?: string }>();
  const searchParams = useSearchParams();
  const returnToParams = buildReturnToParams(readReturnToContext(searchParams));

  const isBackHidden = params.step === '1' || pathname === ROUTES.ON_BOARDING_FINAL();

  const handleBackClick = () => {
    const currentStep = Number(params.step);

    if (!Number.isFinite(currentStep) || currentStep <= 1) {
      router.push(ROUTES.ON_BOARDING(1, returnToParams));
      return;
    }

    router.push(ROUTES.ON_BOARDING(currentStep - 1, returnToParams));
  };

  return (
    <Navigation
      isFixed={true}
      left={isBackHidden ? undefined : <IconArrowBack onClick={handleBackClick} />}
    />
  );
}
