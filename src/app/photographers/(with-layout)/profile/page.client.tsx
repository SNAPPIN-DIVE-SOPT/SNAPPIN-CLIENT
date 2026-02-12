'use client';

import Lottie from 'lottie-react';
import { useState, useEffect, useRef, useCallback, startTransition } from 'react';
import type { UserType } from '@/auth/constant/userType';
import { getUserType, setAuthUser } from '@/auth/userType';
import loadingAnimation from '@/assets/lotties/loading.json';
import ProfileLayout from '@/components/layout/profile/ProfileLayout';
import SwitchProfile from './components/switch-profile/SwitchProfile';

const MIN_DURATION = 1600;

type SwitchControl = {
  startTime: number | null;
  timeoutId: NodeJS.Timeout | null;
};

export default function PageClient() {
  const [userType, setUserTypeState] = useState<UserType | null>(null);
  const [isSwitching, setIsSwitching] = useState(false);

  const switchControlRef = useRef<SwitchControl>({
    startTime: null,
    timeoutId: null,
  });

  // 초기 role 로드
  useEffect(() => {
    let mounted = true;

    const fetchRole = async () => {
      const type = await getUserType();
      if (!mounted) return;
      if (type) setUserTypeState(type as UserType);
    };

    fetchRole();

    return () => {
      mounted = false;
      // unmount 시 타이머 정리
      const { timeoutId } = switchControlRef.current;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // 전환 시작: 시작시간 기록 + UI on
  const startSwitching = useCallback(() => {
    const ctrl = switchControlRef.current;
    ctrl.startTime = Date.now();
    setIsSwitching(true);
  }, []);

  // 전환 종료: MIN_DURATION 보장 + 타이머 관리
  const endSwitching = useCallback(() => {
    const ctrl = switchControlRef.current;

    const elapsed = Date.now() - (ctrl.startTime ?? 0);
    const remaining = Math.max(MIN_DURATION - elapsed, 0);

    if (ctrl.timeoutId) clearTimeout(ctrl.timeoutId);

    ctrl.timeoutId = setTimeout(() => {
      setIsSwitching(false);
      ctrl.startTime = null;
      ctrl.timeoutId = null;
    }, remaining);
  }, []);

  const handleUserTypeChange = useCallback(
    (type: UserType) => {
      startSwitching();

      // storage/cookie 등 side-effect
      setAuthUser({ role: type as UserType, hasPhotographerProfile: true });

      // UI 업데이트는 transition으로
      startTransition(() => {
        setUserTypeState(type);
      });

      endSwitching();
    },
    [startSwitching, endSwitching],
  );

  return (
    <ProfileLayout userType={userType as UserType}>
      <SwitchProfile
        userType={userType}
        onChange={handleUserTypeChange}
        onSwitchStart={startSwitching}
        onSwitchEnd={endSwitching}
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
