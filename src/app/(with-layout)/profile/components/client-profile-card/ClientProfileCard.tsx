'use client';

import Image from 'next/image';
import { useGetUserInfo } from '@/auth/apis';

export default function ClientProfileCard() {
  const { data, isFetching } = useGetUserInfo();

  if (isFetching) {
    return (
      <div className='flex items-center gap-[1.2rem] p-[2rem]  bg-black-1 h-[11.3rem]'>
        <div className='w-[6.4rem] h-[6.4rem] rounded-full bg-black-3' />
        <div className='bg-black-3 w-[4rem] h-[1.7rem] rounded-[0.2rem]'/>
      </div>
    );
  }

  return (
    <div className='flex items-center gap-[1.2rem] p-[2rem] h-[11.3rem]'>
      <Image
        src={data?.profileImageUrl ?? '/imgs/default-profile.png'}
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
