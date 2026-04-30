'use client';

import { TagChip, ImageCarousel, LikeButton } from '@snappin/design-system';
import { MoodCode } from '@snappin/shared/types';
import { useWishPortfolioLike } from '@/ui/frame/apis';
import { useLikeButton } from '@/ui/frame/hooks/useLike';

type PortfolioSectionProps = {
  id: number;
  description: string;
  images: string[];
  isLiked: boolean;
  likeCount: number;
  place: string;
  moods: MoodCode[];
  isLogIn: boolean;
};

export default function PortfolioSection({
  id,
  description,
  images,
  isLiked,
  likeCount,
  place,
  moods,
  isLogIn,
}: PortfolioSectionProps) {
  const { mutate: wishPortfolio} = useWishPortfolioLike({ id, isLogIn });
  const { liked, handleLike, currentLikeCount } = useLikeButton({
    id,
    isLiked,
    likeCount,
    mutate: wishPortfolio,
  });

  const portfolioImages = images.map((image) => ({
    src: image,
    alt: description,
  }));

  return (
    <section className='bg-black-1'>
      {/* 포트폴리오 캐러셀 */}
      <ImageCarousel variant='dots' images={portfolioImages} />
      <div className='flex flex-col gap-[0.8rem] px-[2rem] py-[1.6rem]'>
        <div className='flex justify-between'>
          {/* 설명, 장소 */}
          <div className='flex flex-col'>
            <h1 className='font-16-md text-black-10'>{description}</h1>
            <span className='caption-14-rg text-black-7'>{place}</span>
          </div>
          {/* 좋아요 */}
          <div className='flex items-start'>
            <LikeButton isLiked={liked} handleClick={handleLike} className='h-[2rem]' />
            <span className='font-16-rg text-black-8'>{currentLikeCount}</span>
          </div>
        </div>
        {/* 무드 */}
        <div className='flex gap-[0.4rem]'>
          {moods.map((mood) => (
            <TagChip key={mood} variant='gray' label={mood} />
          ))}
        </div>
      </div>
    </section>
  );
}
