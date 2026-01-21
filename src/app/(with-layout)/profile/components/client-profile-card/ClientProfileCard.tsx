'use client';

import Image from 'next/image';
import { Button } from '@/ui';
import { useGetUserInfo } from '@/auth/apis';
import { useAuth } from '@/auth/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function ClientProfileCard() {
  const { isLogIn } = useAuth();
  const { data, isFetching } = useGetUserInfo();
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  if (!isLogIn) {
    return (
      <div className='flex items-center gap-[1.2rem] p-[2rem]'>
        <Image
          src='/imgs/default-profile.png'
          alt='프로필 이미지'
          width={64}
          height={64}
          className='rounded-full'
        />
        <div className='flex w-full items-center justify-between'>
          <span className='caption-14-bd'>
            로그인이 필요해요
          </span>
          <Button size='small' color='black' onClick={handleLoginClick}>
            로그인
          </Button>
        </div>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className='flex items-center gap-[1.2rem] p-[2rem] py-[2rem]'>
        <div className='w-[6.4rem] h-[6.4rem] rounded-full bg-black-3' />
        <div className='flex flex-col gap-[0.9rem]'>
          <div className='flex flex-col gap-[0.4rem]'>
            <div className='w-[3.7rem] h-[1.7rem] bg-black-3 rounded-[0.2rem]' />
            <div className='w-[9rem] h-[1.2rem] bg-black-3 rounded-[0.2rem]' />
          </div>
          <div className='flex flex-col gap-[0.4rem]'>
            <div className='w-[15.8rem] h-[1.2rem] bg-black-3 rounded-[0.2rem]' />
            <div className='w-[3.7rem] h-[1.2rem] bg-black-3 rounded-[0.2rem]' />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex items-center gap-[1.2rem] p-[2rem]'>
      <Image
        src={data?.profileImageUrl ?? ''}
        alt='프로필 이미지'
        width={64}
        height={64}
        className='rounded-full object-cover'
      />
      <div className='flex w-full items-center justify-between'>
        <span className='caption-14-bd'>
          {data?.clientInfo?.name}
        </span>
      </div>
    </div>
  );
}
