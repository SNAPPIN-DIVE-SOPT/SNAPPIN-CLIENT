import Link from 'next/link';
import Image from 'next/image';
import { Chip } from '@/ui';

type AuthorProps = {
  id: number;
  name: string;
  profileImageUrl: string | null;
  isNew: boolean;
  bio: string;
  specialties: string[];
};

export default function Author({
  id,
  name,
  profileImageUrl,
  isNew,
  bio,
  specialties,
}: AuthorProps) {
  return (
    <Link
      href={`/photographer-detail/${id}`}
      className='bg-black-3 border-black-4 flex w-[18.4rem] shrink-0 flex-col gap-[0.5rem] rounded-[0.4rem] border-[0.5px] p-[1.2rem]'
    >
      <div className='relative h-[16.4rem] w-[16.4rem]'>
        {isNew && (
          <Chip
            label='NEW'
            chipClassName='z-10 bg-neon-black absolute top-[0.6rem] left-[0.6rem] px-[0.6rem] py-[0.3rem]'
            labelClassName='caption-12-md'
          />
        )}
        <Image
          src={profileImageUrl ? profileImageUrl : '/imgs/default-photographer.png'}
          alt={`${name}의 포토폴리오 이미지-${profileImageUrl}`}
          fill
          className='rounded-[0.2rem] object-cover'
        />
      </div>
      <div className='flex flex-col gap-[1.2rem]'>
        <div className='flex flex-col gap-[0.2rem]'>
          <div className='flex items-center justify-start gap-[0.4rem]'>
            <span className='font-16-bd'>{name}</span>
            <span className='caption-12-md'>작가</span>
          </div>
          <p className='caption-14-rg text-black-8 truncate'>{bio}</p>
        </div>
        <div className='flex gap-[0.4rem] overflow-hidden'>
          {specialties.map((specialty) => (
            <Chip
              key={specialty}
              label={specialty}
              chipClassName='px-[0.6rem] py-[0.3rem] border-1 border-black-10 '
              labelClassName='caption-12-md'
            />
          ))}
        </div>
      </div>
    </Link>
  );
}
