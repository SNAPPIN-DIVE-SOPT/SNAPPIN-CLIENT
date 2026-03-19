import Link from 'next/link';
import Image from 'next/image';
import { IconArrowForward } from '@snappin/design-system/assets';
import { GetProductPhotographerInfoResponse } from '@/swagger-api';
import { ROUTES } from '@/constants/routes/routes';

type PhotographerSectionProps = {
  photographerInfo: GetProductPhotographerInfoResponse | undefined;
};

export default function PhotographerSection({ photographerInfo }: PhotographerSectionProps) {
  if (!photographerInfo?.id) {
    return null;
  }

  return (
    <section className='bg-black-1 px-[2rem] pb-[2rem]'>
      <Link href={ROUTES.PHOTOGRAPHER(photographerInfo.id)}>
        <div className='border-black-4 rounded-[0.6rem] border-1 p-[1.2rem]'>
          <div className='flex items-center gap-[1.2rem]'>
            {/* 프로필 이미지 */}
            <div className='relative h-[6.4rem] w-[6.4rem] overflow-hidden rounded-full'>
              <Image
                src={photographerInfo.profileImageUrl || '/imgs/default-profile.png'}
                alt='프로필'
                fill
                className='rounded-full object-cover'
              />
            </div>
            {/* 작가명, 한줄 소개, 촬영 상품, 활동 지역 */}
            <div className='flex flex-1 flex-col gap-[0.8rem]'>
              <div className='flex flex-col'>
                <span className='caption-14-bd text-black-10'>{photographerInfo.name}</span>
                <span className='caption-14-rg text-black-7'>{photographerInfo.bio}</span>
              </div>
              <div className='flex flex-col gap-[0.4rem]'>
                <DetailRow
                  label='촬영 상품'
                  content={photographerInfo.specialties?.join(', ') ?? ''}
                />
                <DetailRow
                  label='활동 지역'
                  content={photographerInfo.locations?.join(', ') ?? ''}
                />
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
      <span className='caption-12-md text-black-7'>{label}</span>
      <span className='caption-12-md text-black-9'>{content}</span>
    </div>
  );
}
