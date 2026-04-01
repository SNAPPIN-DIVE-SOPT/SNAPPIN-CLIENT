'use client';

import { TagChip, ImageCarousel, LikeButton } from '@snappin/design-system';
import { MoodCode } from '@snappin/shared/types';
import { useAuth } from '@/auth/hooks/useAuth';
import { useToast } from '@/ui';
import { useWishPortfolio } from '../api';

type PortfolioSectionProps = {
  id: number;
  description: string;
  images: string[];
  isLiked: boolean;
  likeCount: number;
  snapCategory: string;
  place: string;
  startsAt: string;
  moods: MoodCode[];
};

export default function PortfolioSection({
  id,
  description,
  images,
  isLiked,
  likeCount,
  place,
  moods,
}: PortfolioSectionProps) {
  const { mutate } = useWishPortfolio();
  const { isLogIn } = useAuth();
  const toast = useToast();

  const handleLike = () => {
    if (isLogIn) {
      mutate(id);
    } else if (isLogIn === false) {
      toast.login('좋아요 기능은 로그인 후에 사용할 수 있어요.', undefined, 'bottom-[2rem]');
    }
  };

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
            <LikeButton isLiked={isLiked} handleClick={handleLike} className='h-[2rem]' />
            <span className='font-16-md text-black-7'>{likeCount}</span>
          </div>
        </div>
        {/* 무드 */}
        <div className='flex gap-[0.4rem]'>
          {moods.map((mood) => <TagChip key={mood} variant='gray' label={mood} />)}
        </div>
      </div>
    </section>
  );
}
