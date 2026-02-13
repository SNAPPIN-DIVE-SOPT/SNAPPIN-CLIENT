'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IconArrowForward } from '@/assets';

type PhotographerSectionProps = {
  id: number;
  name: string;
  bio: string;
  specialties: string[];
  locations: string[];
  imageUrl: string;
};

export default function PhotographerSection({
  id,
  name,
  bio,
  specialties,
  locations,
  imageUrl,
}: PhotographerSectionProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/photographer/${id}`);
  };

  return (
    <button
      type='button'
      className='bg-black-1 flex w-full items-center gap-[1.2rem] p-[2rem]'
      onClick={handleClick}
    >
      <div className='h-[64px] w-[64px] shrink-0 overflow-hidden rounded-full'>
        <Image
          src={imageUrl ?? '/imgs/default-profile.png'}
          alt='프로필 이미지'
          width={64}
          height={64}
          className='rounded-full'
        />
      </div>
      <div className='flex flex-1 items-center justify-between gap-[1.2rem]'>
        <div className='flex flex-col gap-[0.9rem]'>
          <div className='flex flex-col items-start'>
            <span className='caption-14-bd text-black-10'>{name}</span>
            <span className='caption-14-rg text-black-7'>{bio}</span>
          </div>
          <div className='flex flex-col gap-[0.4rem]'>
            <div className='flex items-center gap-[0.8rem]'>
              <span className='caption-12-md text-black-7'>촬영 상품</span>
              <span className='caption-12-md text-black-10'>{specialties.join(', ')}</span>
            </div>
            <div className='flex items-center gap-[0.8rem]'>
              <span className='caption-12-md text-black-7'>활동 지역</span>
              <span className='caption-12-md text-black-10'>{locations.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>
      <IconArrowForward className='text-black-6 h-[2.4rem] w-[2.4rem]' />
    </button>
  );
}
