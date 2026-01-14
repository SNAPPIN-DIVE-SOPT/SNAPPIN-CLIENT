'use client';

import { Button } from '@/ui';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

type ProfileCardProps = {
  profileImageUrl: string;
  name: string;
  isLoggedIn: boolean | null;
};

export default function ProfileCard({ profileImageUrl, name, isLoggedIn }: ProfileCardProps) {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

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
        <span className='caption-14-bd text-black-10'>
          {isLoggedIn === true ? name : '로그인이 필요해요'}
        </span>
        {isLoggedIn === false ? (
          <Button size='small' color='black' onClick={handleLoginClick}>
            로그인
          </Button>
        ) : null}
      </div>
    </div>
  );
}
