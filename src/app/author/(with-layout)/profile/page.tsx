'use client';

import { Divider } from '@/ui';
import { Category, SwitchProfile } from './_section';
import { Header, ProfileCard } from './components';
import { authorInfoMock } from './mock/authorInfo.mock';
import { useRouter } from 'next/navigation';
import { hasUserRole, UserRole } from '@/auth/utils/userRoleMapping';

export default function Page() {
  const authorInfo = authorInfoMock.data;
  const router = useRouter();

  const handleSwitchProfile = (nextUserRole: UserRole) => {
    router.push(nextUserRole === 'CLIENT' ? '/profile' : '/author/profile');
  };

  return (
    <div className='flex flex-col'>
      <Header />
      <ProfileCard
        profileImageUrl={authorInfo.profileImageUrl}
        name={authorInfo.photographerInfo.name}
        bio={authorInfo.photographerInfo.bio}
        specialties={authorInfo.photographerInfo.specialties}
        locations={authorInfo.photographerInfo.locations}
        isLoggedIn={true}
      />
      <Divider color='bg-black-3' className='h-[0.6rem]' />
      <Category isLoggedIn={true} />
      {authorInfo.hasPhotographerProfile === true && (
        <>
          <Divider color='bg-black-3' className='h-[0.6rem]' />
          <SwitchProfile
            userRole={hasUserRole(authorInfo.role) ? authorInfo.role : 'PHOTOGRAPHER'}
            handleSwitchProfile={handleSwitchProfile}
          />
        </>
      )}
    </div>
  );
}
