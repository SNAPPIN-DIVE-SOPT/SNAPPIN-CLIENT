'use client';

import { Divider } from '@/ui';
import { Category } from './_section';
import { Header, ProfileCard } from './components';
import { useAuth } from '@/auth/hooks/useAuth';
import { userInfoMock } from './mock/userInfo.mock';

export default function Page() {
  //const { isLogIn } = useAuth();
  const userInfo = userInfoMock.data;

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
    </div>
  );
}
