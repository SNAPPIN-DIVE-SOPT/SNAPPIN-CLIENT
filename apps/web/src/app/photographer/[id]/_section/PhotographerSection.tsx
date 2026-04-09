'use client';

import { Profile } from '@/ui';
import { useGetPhotographerDetail } from '@/app/photographer/[id]/api';

type PhotographerSectionProps = {
  id: number;
};

export default function PhotographerSection({ id }: PhotographerSectionProps) {
  const { data } = useGetPhotographerDetail(id);

  return (
    <Profile className='fixed-center bg-black-1 top-[5rem] z-10'>
      <Profile.Avatar size='md' src={data.profileImageUrl} />
      <Profile.Content lines={2}>
        <Profile.Item>
          <Profile.Title>{data.name}</Profile.Title>
          <Profile.Description>{data.bio}</Profile.Description>
        </Profile.Item>
        <Profile.Item>
          <Profile.Row>
            <Profile.Meta>촬영 상품</Profile.Meta>
            <Profile.Meta className='text-black-9'>{data.specialties?.join(', ')}</Profile.Meta>
          </Profile.Row>
          <Profile.Row>
            <Profile.Meta>활동 지역</Profile.Meta>
            <Profile.Meta className='text-black-9'>{data.locations?.join(', ')}</Profile.Meta>
          </Profile.Row>
        </Profile.Item>
      </Profile.Content>
    </Profile>
  );
};

export const PhotographerSectionSkeleton = () => {
  return (
    <section className='fixed-center bg-black-1 top-[5rem] z-10 flex gap-[1.2rem] p-[2rem]'>
      <div className='bg-black-3 h-[8.7rem] w-[8.7rem] rounded-full' />
      <div className='flex flex-col gap-[0.9rem]'>
        <div className='flex flex-col gap-[0.4rem]'>
          <div className='bg-black-3 h-[2.2rem] w-[4.5rem] rounded-[0.2rem]' />
          <div className='bg-black-3 h-[2.2rem] w-[13.2rem] rounded-[0.2rem]' />
        </div>
        <div className='flex flex-col gap-[0.4rem]'>
          <div className='bg-black-3 h-[1.2rem] w-[15.8rem] rounded-[0.2rem]' />
          <div className='bg-black-3 h-[1.2rem] w-[3.7rem] rounded-[0.2rem]' />
        </div>
      </div>
    </section>
  );
};
