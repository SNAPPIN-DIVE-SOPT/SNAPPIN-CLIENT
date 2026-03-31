'use client';

import { useGetUserInfo } from '@/auth/apis';
import type { GetClientInfoResponse, GetPhotographerProfileResponse } from '@/swagger-api';
import { USER_TYPE, UserType } from '@snappin/shared/types';
import { Profile, ProfileSkeleton } from '@/ui';

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
    return <ProfileSkeleton />;
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

const PhotographerProfileCard = ({ data, imageUrl }: PhotographerProfileCardProps) => {
  if (!data) return null;

  return (
    <Profile>
      <Profile.Avatar src={imageUrl} />
      <Profile.Content lines={2}>
        <Profile.Item>
          <Profile.Title typography='font-16-sb'>{data.name}</Profile.Title>
          <Profile.Description typography='caption-14-rg'>{data.bio}</Profile.Description>
        </Profile.Item>
        <Profile.Item>
          <Profile.Row>
            <Profile.Meta className='shrink-0'>촬영 상품</Profile.Meta>
            <Profile.Meta typography='caption-12-rg' color='black-8'>
              {data?.specialties?.join(', ') ?? '-'}
            </Profile.Meta>
          </Profile.Row>
          <Profile.Row>
            <Profile.Meta className='shrink-0'>활동 지역</Profile.Meta>
            <Profile.Meta typography='caption-12-rg' color='black-8'>
              {data?.locations?.join(', ') ?? '-'}
            </Profile.Meta>
          </Profile.Row>
        </Profile.Item>
      </Profile.Content>
    </Profile>
  );
};

const ClientProfileCard = ({ data, imageUrl }: ClientProfileCardProps) => {
  if (!data) return null;

  return (
    <Profile size='sm'>
      <Profile.Avatar src={imageUrl} />
      <Profile.Content lines={1}>
        <Profile.Item>
          <Profile.Title>{data.name}</Profile.Title>
          <Profile.Description typography='caption-12-rg' color='black-8'>
            {data.curatedMoods}
          </Profile.Description>
        </Profile.Item>
      </Profile.Content>
    </Profile>
  );
};
