'use client';

import Image from 'next/image';
import { ProfileCard } from '@/ui';
import { useAuth } from '@/auth/hooks/useAuth';
import { useGetUserInfo } from '@/auth/apis';
import { UserType, USER_TYPE } from '@/auth/constant/userType';

type ClientProfileCardProps = {
  userType: UserType;
  isSwitching: boolean;
}

export default function ClientProfileCard({ userType, isSwitching }: ClientProfileCardProps) {
  const { isLogIn } = useAuth();
  const { data, isFetching } = useGetUserInfo();
  if (isFetching || isSwitching || !isLogIn) {
    return (
      <div className='flex items-center gap-[1.2rem] p-[2rem] pb-[2.9rem] bg-black-1 h-[11.3rem]'>
        <div className='w-[6.4rem] h-[6.4rem] rounded-full bg-black-3' />
        <div className='bg-black-3 w-[4rem] h-[1.7rem] rounded-[0.2rem]'/>
      </div>
    );
  }

  if (userType === USER_TYPE.PHOTOGRAPHER) {
    return (
      <ProfileCard
        profileImageUrl={data?.profileImageUrl ?? '/imgs/default-profile.png'}
        name={data?.photographerInfo?.name ?? ''}
        bio={data?.photographerInfo?.bio ?? ''}
        specialties={data?.photographerInfo?.specialties ?? []}
        locations={data?.photographerInfo?.locations ?? []}
        isLoggedIn={!!isLogIn}
        className='h-[11.3rem]'
      />
    );
  }

  if (userType === USER_TYPE.CLIENT) {
    return (
      <div className='flex items-center gap-[1.2rem] p-[2rem] pb-[2.9rem] bg-black-1'>
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
            {data?.clientInfo?.name}
          </span>
        </div>
      </div>
    );
  }
}
