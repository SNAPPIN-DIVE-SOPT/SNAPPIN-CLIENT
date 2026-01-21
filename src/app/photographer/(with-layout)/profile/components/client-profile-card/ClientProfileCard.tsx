'use client';

import Image from 'next/image';
import { ProfileCard, Button } from '@/ui';
import { useAuth } from '@/auth/hooks/useAuth';
import { useGetUserInfo } from '@/auth/apis';
import { UserType, USER_TYPE } from '@/auth/constant/userType';
import defaultProfile from '@/../../public/imgs/default-profile.png';

type ClientProfileCardProps = {
  userType: UserType;
  isSwitching: boolean;
}

export default function ClientProfileCard({ userType, isSwitching }: ClientProfileCardProps) {
  const { isLogIn } = useAuth();
  const { data, isFetching } = useGetUserInfo();

  if (!isLogIn) {
    return (
      <div className='flex items-center gap-[1.2rem] p-[2rem] bg-black-1'>
        <Image
          src={defaultProfile}
          alt='프로필 이미지'
          width={64}
          height={64}
          className='rounded-full'
        />
        <div className='flex w-full items-center justify-between'>
          <span className='caption-14-bd'>
            로그인이 필요해요
          </span>
          <Button size='small' color='black'>
            로그인
          </Button>
        </div>
      </div>
    );
  }

  if (isFetching || isSwitching) {
    return (
      <div className='flex items-center gap-[1.2rem] p-[2rem] py-[2.1rem] bg-black-1'>
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

  if (userType === USER_TYPE.PHOTOGRAPHER) {
    return (
      <ProfileCard
        profileImageUrl={data?.profileImageUrl ?? ''}
        name={data?.photographerInfo?.name ?? ''}
        bio={data?.photographerInfo?.bio ?? ''}
        specialties={data?.photographerInfo?.specialties ?? []}
        locations={data?.photographerInfo?.locations ?? []}
        isLoggedIn={!!isLogIn}
      />
    );
  }

  if (userType === USER_TYPE.CLIENT) {
    return (
      <div className='flex items-center gap-[1.2rem] p-[2rem] pb-[2.9rem] bg-black-1'>
        <Image
          src={data?.profileImageUrl ?? ''}
          alt='프로필 이미지'
          width={64}
          height={64}
          className='rounded-full'
        />
        <div className='flex w-full items-center justify-between'>
          <span className='caption-14-bd'>
            {data?.clientInfo?.name}
          </span>
        </div>
      </div>
    );
  }
}
