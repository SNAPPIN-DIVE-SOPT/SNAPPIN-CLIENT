'use client';

import Lottie from 'lottie-react';
import { startTransition, useCallback, useEffect, useState } from 'react';
import { isValidUserType, type UserType } from '@/auth/constant/userType';
import { getUserType, setAuthUser } from '@/auth/userType';
import { useSwitchUserProfile } from '@/auth/apis';
import loadingAnimation from '@/assets/lotties/loading.json';
import ProfileLayout from '@/components/layout/profile/ProfileLayout';
import SwitchProfile from './components/switch-profile/SwitchProfile';
import { useMinDurationLoading } from './hooks/useMinDurationLoading';

const MIN_DURATION = 1600;

export default function PageClient() {
  const [userType, setUserTypeState] = useState<UserType | null>(null);

  const { loading: isSwitching, start, end } = useMinDurationLoading(MIN_DURATION);
  const { mutateAsync, isPending } = useSwitchUserProfile();

  useEffect(() => {
    let mounted = true;

    (async () => {
      const type = await getUserType();
      if (!mounted) return;
      if (type && isValidUserType(type)) setUserTypeState(type);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSwitchClick = useCallback(async () => {
    if (!userType) return;

    start();

    try {
      const data = await mutateAsync();

      const nextRole = data?.role;
      if (!nextRole || !isValidUserType(nextRole)) return;

      // TODO: 서버 응답에 hasPhotographerProfile 있으면 그걸로 교체
      await setAuthUser({ role: nextRole, hasPhotographerProfile: true });

      startTransition(() => {
        setUserTypeState(nextRole);
      });
    } finally {
      end();
    }
  }, [userType, mutateAsync, start, end]);

  if (!userType) return null;

  return (
    <ProfileLayout userType={userType}>
      <SwitchProfile
        userType={userType}
        onClick={handleSwitchClick}
        disabled={isPending || isSwitching || !userType}
      />
      {isSwitching && (
        <div className='absolute inset-0 z-50 flex h-dvh flex-col items-center justify-center bg-black/30'>
          <Lottie animationData={loadingAnimation} className='h-[15rem] w-[15rem]' />
          <span className='title-20-bd text-neon-black'>계정 전환 중...</span>
        </div>
      )}
    </ProfileLayout>
  );
}
