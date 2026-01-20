import Image from 'next/image';
import defaultProfile from '@/../public/imgs/default-profile.png';

type PhotographerSectionProps = {
  name: string;
  bio: string;
  specialties: string[];
  locations: string[];
};

type DetailRowProps = {
  label: string;
  content: string[];
}

export function PhotographerSection({
  name,
  bio,
  specialties,
  locations
}: PhotographerSectionProps) {
  return (
    <section className='sticky top-[5rem] p-[2rem] bg-black-1 z-10'>
      <div className='flex gap-[1.2rem]'>
        {/* 프로필 이미지 */}
        <div className='relative w-[8.7rem] h-[8.7rem]'>
          <Image
            src={defaultProfile}
            alt='기본 프로필 이미지'
            fill
            className='object-fill'
          />
        </div>
        {/* 작가 정보 */}
        <div className='flex flex-col flex-1 gap-[0.9rem]'>
          <div className='flex flex-col gap-[0.2rem]'>
            <h2 className='font-16-bd text-black-10'>{name}</h2>
            <p className='caption-14-rg text-black-8'>{bio}</p>
          </div>
          <div className='flex flex-col gap-[0.4rem]'>
            <DetailRow label='촬영 상품' content={specialties} />
            <DetailRow label='활동 지역' content={locations} />
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailRow({
  label,
  content,
}: DetailRowProps) {
  return (
    <div className='flex gap-[0.8rem]'>
      <dt className='caption-12-md text-black-7'>{label}</dt>
      <dd className='caption-12-md text-black-9'>{content.join(', ')}</dd>
    </div>
  );
}

// TODO: 스켈레톤 위치
export const PhotographerSectionSkeleton = () => {
  return (
    <section className='flex gap-[1.2rem] p-[2rem]'>
      <div className='w-[8.7rem] h-[8.7rem] bg-black-3 rounded-full' />
      <div className='flex flex-col gap-[0.9rem]'>
        <div className='flex flex-col gap-[0.4rem]'>
          <div className='w-[4.5rem] h-[2.2rem] bg-black-3 rounded-[0.2rem]' />
          <div className='w-[13.2rem] h-[2.2rem] bg-black-3 rounded-[0.2rem]' />
        </div>
        <div className='flex flex-col gap-[0.4rem]'>
          <div className='w-[15.8rem] h-[1.2rem] bg-black-3 rounded-[0.2rem]' />
          <div className='w-[3.7rem] h-[1.2rem] bg-black-3 rounded-[0.2rem]' />
        </div>
      </div>
    </section>
  );
}