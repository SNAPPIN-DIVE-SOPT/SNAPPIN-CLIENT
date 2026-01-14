'use client';

import { useState } from 'react';
import { Divider } from '@/ui';
import { Category, SwitchProfile } from './_section';
import { Header, ProfileCard } from './components';
import { userInfoMock } from './mock/userInfo.mock';
import { useRouter } from 'next/navigation';
import { UserType, USER_TYPE } from '@/auth/constant/userType';
import { useToast } from '@/ui/toast/hooks/useToast';
import { useAuth } from '@/auth/hooks/useAuth';

export default function Page() {
  const userInfo = userInfoMock.data;
  const router = useRouter();
  const toast = useToast();
  const [isSwitchingProfile, setIsSwitchingProfile] = useState(false);
  const { isLogIn, logout } = useAuth();

  const handlePatchUserRole = async (nextUserType: UserType) => {
    try {
      void nextUserType;
      // TODO: PATCH API 연동
    } catch {
      toast.error(
        '계정 전환에 실패했습니다. 잠시 후 다시 시도해주세요.',
        undefined,
        'bottom-[2rem]',
      );
    }
  };

  const handleSwitchProfile = (nextUserType: UserType) => {
    if (isSwitchingProfile) {
      return;
    }

    setIsSwitchingProfile(true);
    void handlePatchUserRole(nextUserType);

    const intervalId = window.setInterval(() => {
      window.clearInterval(intervalId);
      router.push(nextUserType === USER_TYPE.CLIENT ? '/profile' : '/author/profile');
    }, 2000);
  };

  return (
    <div className='bg-black-3 flex-col'>
      <Header />
      <ProfileCard
        profileImageUrl={userInfo.profileImageUrl}
        name={userInfo.clientInfo.name}
        isLoggedIn={isLogIn}
      />
      <Divider color='bg-black-3' className='h-[0.6rem]' />
      <Category isLoggedIn={isLogIn} handleLogout={logout} />
      {isLogIn === true && userInfo.hasPhotographerProfile === true && (
        <>
          <Divider color='bg-black-3' className='h-[0.6rem]' />
          <SwitchProfile
            userType={userInfo.role as UserType}
            handleSwitchProfile={handleSwitchProfile}
          />
        </>
      )}
    </div>
  );
}
