'use client';

import { useState } from 'react';
import { TagChip } from '@/ui';
import { MoodCode } from '@/types/moodCode';
import { PortfolioCarousel, LikeButton } from '../components/index';

type PortfolioSectionProps = {
  id: number;
  description: string;
  images: { src: string; alt: string }[];
  initialIsLiked: boolean;
  initialLikeCount: number;
  snapCategory: string;
  place: string;
  startsAt: string;
  moods: MoodCode[];
};

type DetailRowProps = {
  label: string;
  content: string | MoodCode[];
}

export default function PortfolioSection({
  id,
  description,
  images,
  initialIsLiked,
  initialLikeCount,
  snapCategory,
  place,
  startsAt,
  moods
}: PortfolioSectionProps) {
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);

  const handleLike = () => {
    const willBeLiked = !isLiked;
    setIsLiked(willBeLiked);
    setLikeCount((prev) => willBeLiked ? prev + 1 : prev - 1);
    // TODO: 포폴 좋아요/취소 API 연동 (request에 id 전달)
  };

  return (
    <section className='bg-black-1'>
      {/* 포트폴리오 캐러셀 */}
      <PortfolioCarousel images={images} />
      {/* 한줄 설명, 좋아요 */}
      <div className='flex justify-between items-center px-[2rem] py-[1.6rem]'>
        <h1 className='font-16-bd text-black-10'>{description}</h1>
        <div className='flex items-center gap-[0.2rem] w-[4.4rem] h-[3rem]'>
          <LikeButton
            isLiked={isLiked}
            handleClick={handleLike}
          />
          <span className='font-18-md text-black-9'>{likeCount}</span>
        </div>
      </div>
      {/* 관련 정보 */}
      <div className='flex flex-col gap-[0.8rem] p-[2rem]'>
        <h2 className='caption-12-md text-black-10'>관련 정보</h2>
        <div className='flex flex-col self-stretch gap-[1.2rem] p-[1.6rem] bg-black-1 border-1 border-black-4 rounded-[0.6rem]'>
          <DetailRow label='촬영 종류' content={snapCategory} />
          <DetailRow label='촬영 장소' content={place} />
          <DetailRow label='촬영 시각' content={startsAt} />
          <DetailRow label='스냅 무드' content={moods} />
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
    <div className='flex gap-[1rem]'>
      <div className='w-[8rem] self-center caption-12-md text-black-7'>{label}</div>
      {Array.isArray(content)
        ? <div className='flex items-center gap-[0.4rem]'>
            {content.map((mood) => <TagChip key={mood} variant='neon' label={mood} />)}
          </div>
        : <span className='caption-12-md text-black-9'>{content}</span>
      }
    </div>
  );
}