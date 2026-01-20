import Link from 'next/link';
import Image from 'next/image';
import defaultProfile from '@/../public/imgs/default-profile.png';
import { IconArrowForward } from '@/assets';

type PhotographerSectionProps = {
  photographerInfo :{
    id: number;
    name: string;
    bio: string;
    specialties: string[];
    locations: string[];
  }
}

export default function PhotographerSection({ photographerInfo }: PhotographerSectionProps) {
  return (
    <section className='px-[2rem] pb-[2rem]'>
      <Link href={`/photographer-detail/${photographerInfo.id}`}>
        <div className='p-[2rem] border-1 border-black-4 rounded-[0.6rem]'>
          <div className='flex gap-[1.2rem] items-center'>
            {/* 프로필 이미지 */}
            <div className='relative w-[6.4rem] h-[6.4rem]'>
              <Image
                src={defaultProfile}
                alt='기본 프로필 이미지'
                fill
              />
            </div>
            {/* 작가명, 한줄 소개, 촬영 상품, 활동 지역 */}
            <div className='flex flex-col flex-1 gap-[0.8rem]'>
              <div className='flex flex-col gap-[0.4rem]'>
                <span className='caption-14-bd text-black-10'>{photographerInfo.name}</span>
                <span className='caption-12-md text-black-7'>{photographerInfo.bio}</span>
              </div>
              <div className='flex flex-col gap-[0.4rem]'>
                <DetailRow label='촬영 상품' content={photographerInfo.specialties.join(', ')} />
                <DetailRow label='활동 지역' content={photographerInfo.locations.join(', ')} />
              </div>
            </div>
            {/* 우측 버튼 */}
            <IconArrowForward className='text-black-6' />
          </div>
        </div>
      </Link>
    </section>
  );
}

function DetailRow({ label, content }: { label: string; content: string }) {
  return (
    <div className='flex gap-[0.8rem]'>
      <span className='caption-10-md text-black-7'>{label}</span>
      <span className='caption-10-md text-black-9'>{content}</span>
    </div>
  );
}