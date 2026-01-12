import Link from 'next/link';
import { IconArrowForward } from '@/assets';

type AuthorSectionProps = {
  id: number;
  name: string;
  bio: string;
  specialties: string[];
  locations: string[];
};

type DetailRowProps = {
  label: string;
  content: string[];
}

export default function AuthorSection({
  id,
  name,
  bio,
  specialties,
  locations
}: AuthorSectionProps) {
  return (
    <section className='p-[2rem] bg-black-1'>
      <Link
        href={`/author-detail/${id}`}
        aria-label={`${name} 작가 상세 페이지로 이동`}
        className='flex items-center gap-[1.2rem]'
      >
        {/* 프로필 이미지 */}
        <div className='w-[6.4rem] h-[6.4rem] bg-black-3 rounded-full'>
          {/* TODO: 추후 기본 프로필 이미지 혹은 더미데이터 전달 받으면 이미지 추가 */}
        </div>
        {/* 작가 정보 */}
        <div className='flex flex-col flex-1 gap-[0.8rem]'>
          <div className='flex flex-col gap-[0.4rem]'>
            <h2 className='caption-14-bd text-black-10'>{name}</h2>
            <span className='caption-12-md text-black-7'>{bio}</span>
          </div>
          <div className='flex flex-col gap-[0.4rem]'>
            <DetailRow label='촬영 상품' content={specialties} />
            <DetailRow label='활동 지역' content={locations} />
          </div>
        </div>
        {/* 우측 버튼 */}
        <IconArrowForward className='w-[2.4rem] h-[2.4rem] text-black-6' />
      </Link>
    </section>
  );
}

function DetailRow({
  label,
  content,
}: DetailRowProps) {
  return (
    <div className='flex gap-[0.8rem]'>
      <div className='self-center caption-10-md text-black-7'>{label}</div>
      <span className='caption-10-md text-black-9'>{content.join(', ')}</span>
    </div>
  );
}