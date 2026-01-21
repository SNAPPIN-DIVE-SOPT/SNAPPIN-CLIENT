'use client';

import { useState, useEffect } from 'react';
import { Divider } from '@/ui';
import { ClientHeader, ClientProfileCard, Menus, SwitchProfile } from './components';
import { USER_TYPE, UserType } from '@/auth/constant/userType';
import { getUserType, setUserType } from '@/auth/userType';

export default function Page() {
  const [userType, setUserTypeState] = useState<UserType>(USER_TYPE.CLIENT);
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    const fetchRole = async () => {
      const type = await getUserType();
      if (type) setUserTypeState(type as UserType);
    };
    fetchRole();
  }, []);

  const handleUserTypeChange = (type: UserType) => {
    setIsSwitching(true);

    setTimeout(() => {
      setIsSwitching(false);
      setUserTypeState(type);
      setUserType(type);
    }, 1000);
  };

  return (
    <div className='relative bg-black-3 flex flex-col'>
      <ClientHeader />
      <ClientProfileCard userType={userType} isSwitching={isSwitching} />
      <Divider color='bg-black-3' className='h-[0.6rem]' />
      <Menus />
      <SwitchProfile userType={userType} onChange={handleUserTypeChange} />
      {isSwitching && (
        <div className='absolute flex justify-center items-center h-screen inset-0 z-50 bg-black/30 pointer-events-auto'>
          <span className='title-20-bd text-neon-black'>계정 전환 중...</span>
        </div>
      )}
    </div>
  );
}
