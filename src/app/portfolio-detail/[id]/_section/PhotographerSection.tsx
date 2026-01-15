'use client';

import { IconArrowForward } from '@/assets';
import { ProfileCard } from '@/ui/photographer';
import { useRouter } from 'next/navigation';

type PhtographerSectionProps = {
  id: number;
  name: string;
  bio: string;
  specialties: string[];
  locations: string[];
};

export default function PhtographerSection({
  id,
  name,
  bio,
  specialties,
  locations,
}: PhtographerSectionProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/photographer-detail/${id}`);
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
