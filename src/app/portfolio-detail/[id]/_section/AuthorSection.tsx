'use client';

import { IconArrowForward } from '@/assets';
import { ProfileCard } from '@/ui/photographer';
import { useRouter } from 'next/navigation';

type AuthorSectionProps = {
  id: number;
  name: string;
  bio: string;
  specialties: string[];
  locations: string[];
};

export default function AuthorSection({
  id,
  name,
  bio,
  specialties,
  locations,
}: AuthorSectionProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/author-detail/${id}`);
  };

  return (
    <ProfileCard
      isLoggedIn={true}
      profileImageUrl={''}
      name={name}
      bio={bio}
      specialties={specialties}
      locations={locations}
      icon={<IconArrowForward className='text-black-6 h-[2.4rem] w-[2.4rem]' />}
      onClick={handleClick}
    />
  );
}
