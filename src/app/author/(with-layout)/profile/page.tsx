'use client';

import { useState } from 'react';
import { Divider } from '@/ui';
import { Category, SwitchProfile } from './_section';
import { Header, ProfileCard } from './components';
import { authorInfoMock } from './mock/authorInfo.mock';
import { useRouter } from 'next/navigation';
import { UserType, USER_TYPE } from '@/auth/constant/userType';
import { useAuth } from '@/auth/hooks/useAuth';

export default function Page() {
  const authorInfo = authorInfoMock.data;
  const router = useRouter();
  const [isSwitchingProfile, setIsSwitchingProfile] = useState(false);
  const { isLogIn, logout } = useAuth();

  const handlePatchUserRole = async (nextUserType: UserType) => {
    try {
      void nextUserType;
      // TODO: PATCH API 연동
    } catch {}
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
    <div className='bg-black-3 flex flex-col'>
      <Header />
      <ProfileCard
        profileImageUrl={authorInfo.profileImageUrl}
        name={authorInfo.photographerInfo.name}
        bio={authorInfo.photographerInfo.bio}
        specialties={authorInfo.photographerInfo.specialties}
        locations={authorInfo.photographerInfo.locations}
        isLoggedIn={isLogIn}
      />
      <Divider color='bg-black-3' className='h-[0.6rem]' />
      <Category isLoggedIn={isLogIn} handleLogout={logout} />
      {isLogIn === true && authorInfo.hasPhotographerProfile === true ? (
        <>
          <Divider color='bg-black-3' className='h-[0.6rem]' />
          <SwitchProfile
            userType={authorInfo.role as UserType}
            handleSwitchProfile={handleSwitchProfile}
          />
        </>
      ) : null}
    </div>
  );
}
