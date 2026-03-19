'use client';

import Lottie from 'lottie-react';
import { useSwitchUserProfile } from '@/auth/apis';
import loadingAnimation from '@snappin/design-system/assets/lotties/loading.json';
import SwitchProfile from './components/switch-profile/SwitchProfile';
import { useMinDurationLoading } from './hooks/useMinDurationLoading';
import { isValidUserType, UserType } from '@snappin/shared/types';

const MIN_DURATION = 1600;

type PageClientProps = {
  initialUserType: UserType;
};

export default function PageClient({ initialUserType }: PageClientProps) {
  const { isSwitching, start, end } = useMinDurationLoading(MIN_DURATION);
  const { mutateAsync, isPending } = useSwitchUserProfile();

  const handleSwitchClick = async () => {
    start();

    try {
      const data = await mutateAsync();

      const nextRole = data?.role;
      if (!nextRole || !isValidUserType(nextRole)) return;
    } finally {
      end();
    }
  };

  return (
    <>
      <SwitchProfile
        userType={initialUserType}
        onClick={handleSwitchClick}
        disabled={isPending || isSwitching}
      />
      {isSwitching && (
        <div className='fixed-center top-0 z-50 flex h-dvh flex-col items-center justify-center bg-black/30'>
          <Lottie animationData={loadingAnimation} className='h-[15rem] w-[15rem]' />
          <span className='title-20-bd text-neon-black'>怨꾩젙 ?꾪솚 以?..</span>
        </div>
      )}
    </>
  );
}
