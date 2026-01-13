'use client';

import { Button } from '@/ui';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

type ProfileCardInfoRowProps = {
  label: string;
  value: string;
};

const ProfileCardInfoRow = ({ label, value }: ProfileCardInfoRowProps) => (
  <div className='flex items-center gap-[0.8rem]'>
    <span className='caption-10-md text-black-7'>{label}</span>
    <span className='caption-10-md text-black-10'>{value}</span>
  </div>
);

type ProfileCardProps = {
  profileImageUrl: string;
  name: string;
  isLoggedIn: boolean | null;
  bio: string;
  specialties: string[];
  locations: string[];
};

export default function ProfileCard({
  profileImageUrl,
  name,
  isLoggedIn,
  bio,
  specialties,
  locations,
}: ProfileCardProps) {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  const profileCardInfoRows = [
    { label: '촬영 상품', value: specialties.join(', ') },
    { label: '활동 지역', value: locations.join(', ') },
  ];

  return (
    <div className='bg-black-1 flex items-center gap-[1.2rem] p-[2rem]'>
      <Image
        src={
          isLoggedIn === true
            ? (profileImageUrl ?? '/imgs/default-profile.png')
            : '/imgs/default-profile.png'
        }
        alt='프로필 이미지'
        width={64}
        height={64}
        className='rounded-full'
      />

      <div className='flex flex-1 items-center justify-between gap-[1.2rem]'>
        {isLoggedIn === false ? (
          <span className='caption-14-bd text-black-10'>로그인이 필요해요</span>
        ) : isLoggedIn === true ? (
          <div className='flex flex-col gap-[0.9rem]'>
            <div className='flex flex-col gap-[0.4rem]'>
              <span className='caption-14-bd text-black-10'>{name}</span>
              <span className='caption-12-md text-black-7'>{bio}</span>
            </div>
            <div className='flex flex-col gap-[0.4rem]'>
              {profileCardInfoRows.map(({ label, value }) => (
                <ProfileCardInfoRow key={label} label={label} value={value} />
              ))}
            </div>
          </div>
        ) : null}

        {isLoggedIn === false ? (
          <Button size='small' color='black' onClick={handleLoginClick}>
            로그인
          </Button>
        ) : null}
      </div>
    </div>
  );
}
