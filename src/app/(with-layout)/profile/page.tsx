'use client';

import { useRouter } from 'next/navigation';
import { Divider, Button } from '@/ui';
import { ClientHeader, ClientProfileCard, Menus } from './components';
import Image from 'next/image';
import { useAuth } from '@/auth/hooks/useAuth';

export default function Page() {
  const { isLogIn } = useAuth();

  return (
    <div className='flex flex-col'>
      <ClientHeader />
      {isLogIn !== null && !isLogIn
        ? <GuestProfileCard />
        : <ClientProfileCard />
      }
      <Divider color='bg-black-3' className='h-[0.6rem]' />
      <Menus />
    </div>
  );
}

const GuestProfileCard = () => {
  const router = useRouter();
  const handleGoLogin = () => router.push('/login');

  return (
  <div className='flex items-center gap-[1.2rem] p-[2rem]'>
    <div className='w-[64px] h-[64px] rounded-full overflow-hidden shrink-0'>
      <Image
        src='/imgs/default-profile.png'
        alt='프로필 이미지'
        width={64}
        height={64}
        className='object-cover'
        priority
      />
    </div>
    <div className='flex w-full items-center justify-between'>
      <span className='caption-14-bd'>
        로그인이 필요해요
      </span>
      <Button size='small' color='black' onClick={handleGoLogin}>
        로그인
      </Button>
    </div>
  </div>
  );
}