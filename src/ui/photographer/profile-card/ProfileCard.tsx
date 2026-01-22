'use client';

import { Button } from '@/ui';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/utils/cn';

type ProfileCardProps = React.HTMLAttributes<HTMLDivElement> & {
  profileImageUrl: string;
  name: string;
  isLoggedIn: boolean;
  bio: string;
  specialties: string[];
  locations: string[];
  icon?: React.ReactNode;
};

export default function ProfileCard({
  profileImageUrl,
  name,
  isLoggedIn,
  bio,
  specialties,
  locations,
  icon,
  className,
  ...props
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
    <div className={cn('bg-black-1 flex items-center gap-[1.2rem] p-[2rem]', className)} {...props}>
      <Image
        src={isLoggedIn && profileImageUrl ? profileImageUrl : '/imgs/default-profile.png'}
        alt='프로필 이미지'
        width={64}
        height={64}
        className='rounded-full'
      />

      <div className='flex flex-1 items-center justify-between gap-[1.2rem]'>
        {!isLoggedIn ? (
          <span className='caption-14-bd text-black-10'>로그인이 필요해요</span>
        ) : (
          <div className='flex flex-col gap-[0.9rem]'>
            <div className='flex flex-col'>
              <span className='caption-14-bd text-black-10'>{name}</span>
              <span className='caption-14-rg text-black-7'>{bio}</span>
            </div>
            <div className='flex flex-col gap-[0.4rem]'>
              {profileCardInfoRows.map(({ label, value }) => (
                <ProfileCardInfoRow key={label} label={label} value={value} />
              ))}
            </div>
          </div>
        )}

        {!isLoggedIn && (
          <Button size='small' color='black' onClick={handleLoginClick}>
            로그인
          </Button>
        )}
      </div>
      {icon && icon}
    </div>
  );
}

type ProfileCardInfoRowProps = {
  label: string;
  value: string;
};

const ProfileCardInfoRow = ({ label, value }: ProfileCardInfoRowProps) => (
  <div className='flex items-center gap-[0.8rem]'>
    <span className='caption-12-md text-black-7'>{label}</span>
    <span className='caption-12-md text-black-10'>{value}</span>
  </div>
);
