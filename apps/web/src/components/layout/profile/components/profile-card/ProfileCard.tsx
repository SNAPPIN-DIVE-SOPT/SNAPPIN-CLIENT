'use client';

import Image from 'next/image';
import { useGetUserInfo } from '../../../../../auth/apis';
import { UserType, USER_TYPE } from '../../../../../auth/constant/userType';
import type {
  GetClientInfoResponse,
  GetPhotographerProfileResponse,
} from '@/swagger-api';

type ProfileCardProps = {
  userType: UserType | null;
  isSwitching?: boolean;
};

type ClientProfileCardProps = {
  data: GetClientInfoResponse | undefined;
  imageUrl: string;
};

type PhotographerProfileCardProps = {
  data: GetPhotographerProfileResponse | undefined;
  imageUrl: string;
};

export default function ProfileCard({ userType, isSwitching }: ProfileCardProps) {
  const { data, isFetching } = useGetUserInfo();

  if (isFetching || isSwitching || !userType) {
    return <ProfileCardSkeleton />;
  }

  if (userType === USER_TYPE.PHOTOGRAPHER) {
    return (
      <PhotographerProfileCard
        data={data?.photographerInfo}
        imageUrl={data?.profileImageUrl ?? ''}
      />
    );
  }

  if (userType === USER_TYPE.CLIENT) {
    return <ClientProfileCard data={data?.clientInfo} imageUrl={data?.profileImageUrl ?? ''} />;
  }
}

const ProfileCardSkeleton = () => {
  return (
    <div className='bg-black-1 flex h-[11.5rem] items-center gap-[1.2rem] p-[2rem] pb-[2.9rem]'>
      <div className='bg-black-3 h-[6.4rem] w-[6.4rem] rounded-full' />
      <div className='bg-black-3 h-[1.7rem] w-[4rem] rounded-[0.2rem]' />
    </div>
  );
};

const PhotographerProfileCard = ({ data, imageUrl }: PhotographerProfileCardProps) => {
  if (!data) return null;

  const profileCardInfoRows = [
    { label: '촬영 상품', value: data?.specialties?.join(', ') ?? '' },
    { label: '활동 지역', value: data?.locations?.join(', ') ?? '' },
  ];

  return (
    <div className='bg-black-1 flex h-[11.5rem] items-center gap-[1.2rem] p-[2rem]'>
      <div className='h-[64px] w-[64px] shrink-0 overflow-hidden rounded-full'>
        <Image
          src={imageUrl ?? '/imgs/default-profile.png'}
          alt='프로필 이미지'
          width={64}
          height={64}
          className='object-cover'
          priority
        />
      </div>

      <div className='flex h-full flex-col gap-[0.9rem]'>
        <div className='flex flex-col gap-[0.4rem]'>
          <span className='caption-14-bd text-black-10'>{data.name ?? ''}</span>
          <span className='caption-14-rg text-black-7'>{data.bio ?? ''}</span>
        </div>
        <div className='flex flex-col gap-[0.4rem]'>
          {profileCardInfoRows.map(({ label, value }) => (
            <div className='flex items-center gap-[0.8rem]' key={label}>
              <span className='caption-12-md text-black-7'>{label}</span>
              <span className='caption-12-md text-black-10'>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ClientProfileCard = ({ data, imageUrl }: ClientProfileCardProps) => {
  if (!data) return null;

  return (
    <div className='bg-black-1 flex h-[11.5rem] items-center gap-[1.2rem] p-[2rem]'>
      <div className='h-[64px] w-[64px] shrink-0 overflow-hidden rounded-full'>
        <Image
          src={imageUrl ?? '/imgs/default-profile.png'}
          alt='프로필 이미지'
          width={64}
          height={64}
          className='object-cover'
          priority
        />
      </div>
      <div className='flex w-full items-center justify-between'>
        <span className='caption-14-bd'>{data?.name}</span>
      </div>
    </div>
  );
};
