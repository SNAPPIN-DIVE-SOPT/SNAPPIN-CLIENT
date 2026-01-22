'use client';

import { useState, useEffect, useRef } from 'react';
import { Divider } from '@/ui';
import { ClientHeader, ClientProfileCard, Menus, SwitchProfile } from './components';
import { USER_TYPE, UserType } from '@/auth/constant/userType';
import { getUserType, setUserType } from '@/auth/userType';

const MIN_DURATION = 800; 

export default function Page() {
  const [userType, setUserTypeState] = useState<UserType>(USER_TYPE.CLIENT);
  const [isSwitching, setIsSwitching] = useState(false);

  const startTimeRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      const type = await getUserType();
      if (type) setUserTypeState(type as UserType);
    };
    fetchRole();
  }, []);

  // 전환 시작 : 전환 시작 시간 기록
  const startSwitching = () => {
    startTimeRef.current = Date.now();
    setIsSwitching(true);
  };

  // 전환 종료 : 최소 지속 시간(minDuration) 보장
  const endSwitching = () => {
    const elapsed = Date.now() - (startTimeRef.current ?? 0);
    const remaining = Math.max(MIN_DURATION - elapsed, 0);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsSwitching(false);
      startTimeRef.current = null;
    }, remaining);
  };

  const handleUserTypeChange = (type: UserType) => {
    startSwitching();

    // 여기서 요청이 끝났다고 가정
    setUserTypeState(type);
    setUserType(type);
    endSwitching();
  };

  return (
    <div className='relative bg-black-3 flex flex-col'>
      <ClientHeader />
      <ClientProfileCard userType={userType} isSwitching={isSwitching} />
      <Divider color='bg-black-3' className='h-[0.6rem]' />
      <Menus />
      <SwitchProfile
        userType={userType}
        onChange={handleUserTypeChange}
        onSwitchStart={startSwitching}
        onSwitchEnd={endSwitching}
      />

      {isSwitching && (
        <div className='absolute h-dvh inset-0 z-50 flex items-center justify-center bg-black/30'>
          <span className='title-20-bd text-neon-black'>계정 전환 중...</span>
        </div>
      )}
    </div>
  );
}