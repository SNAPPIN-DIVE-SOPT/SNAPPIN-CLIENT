'use client';

import Image from 'next/image';
import { useGetUserInfo } from '@/auth/apis';

export default function ClientProfileCard() {
  const { data, isFetching } = useGetUserInfo();

  if (isFetching) {
    return (
      <div className='flex items-center gap-[1.2rem] p-[2rem] py-[1.7rem]'>
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
      <div className='w-[64px] h-[64px] rounded-full overflow-hidden shrink-0'>
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
      </div>
      <div className='flex w-full items-center justify-between'>
        <span className='caption-14-bd'>
          {data?.clientInfo?.name}
        </span>
      </div>
    </div>
  );
}
