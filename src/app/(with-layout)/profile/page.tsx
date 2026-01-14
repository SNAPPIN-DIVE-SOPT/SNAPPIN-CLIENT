'use client';

import { Divider } from '@/ui';
import { Category, SwitchProfile } from './_section';
import { Header, ProfileCard } from './components';
import { userInfoMock } from './mock/userInfo.mock';
import { useRouter } from 'next/navigation';
import { hasUserRole, UserRole } from '@/auth/utils/userRoleMapping';

export default function Page() {
  const userInfo = userInfoMock.data;
  const router = useRouter();

  const handleSwitchProfile = (nextUserRole: UserRole) => {
    router.push(nextUserRole === 'CLIENT' ? '/profile' : '/author/profile');
  };

  return (
    <div className='flex flex-col'>
      <Header />
      <ProfileCard
        profileImageUrl={userInfo.profileImageUrl}
        name={userInfo.clientInfo.name}
        isLoggedIn={true}
      />
      <Divider color='bg-black-3' className='h-[0.6rem]' />
      <Category isLoggedIn={true} />
      {userInfo.hasPhotographerProfile === true ? (
        <>
          <Divider color='bg-black-3' className='h-[0.6rem]' />
          <SwitchProfile
            userRole={hasUserRole(userInfo.role) ? userInfo.role : 'CLIENT'}
            handleSwitchProfile={handleSwitchProfile}
          />
        </>
      ) : null}
    </div>
  );
}
