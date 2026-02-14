'use client';

import { IconArrowForward } from '@/assets';
import { ProfileCard } from '@/ui/photographer';
import { useRouter } from 'next/navigation';

type PhotographerSectionProps = {
  id: number;
  name: string;
  imageUrl: string;
  bio: string;
  specialties: string[];
  locations: string[];
};

export default function PhotographerSection({
  id,
  name,
  imageUrl,
  bio,
  specialties,
  locations,
}: PhotographerSectionProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/photographer/${id}`);
  };

  return (
    <ProfileCard
      isLoggedIn={true}
      profileImageUrl={imageUrl}
      name={name}
      bio={bio}
      specialties={specialties}
      locations={locations}
      icon={<IconArrowForward className='text-black-6 h-[2.4rem] w-[2.4rem]' />}
      onClick={handleClick}
    />
  );
}
