'use client';

import { MoodCode } from '@snappin/shared/types';
import { formatPrice } from '@snappin/shared/lib';
import { IconStar } from '@snappin/design-system/assets';
import { ImageCarousel, LikeButton, TagChip } from '@snappin/design-system';
import { useToast } from '@/ui';
import { useAuth } from '@/auth/hooks/useAuth';
import { useWishProduct } from '@/app/product/[id]/api';

type ProductMainSectionProps = {
  id: number;
  images: string[];
  title: string;
  isLiked: boolean;
  likeCount: number;
  averageRate: number;
  reviewCount: number;
  price: number;
  moods: MoodCode[];
  photographerId: number;
};

export default function ProductMainSection({
  id,
  images,
  title,
  isLiked,
  likeCount,
  averageRate,
  reviewCount,
  price,
  moods,
  photographerId,
}: ProductMainSectionProps) {
  const { mutateAsync } = useWishProduct(photographerId);
  const { isLogIn } = useAuth();
  const toast = useToast();

  const productImages = images.map((image) => ({ src: image, alt: title }));

  const handleLike = async () => {
    if (isLogIn) {
      mutateAsync(id);
    } else if (isLogIn === false) {
      toast.login(
        '좋아요 기능은 로그인 후에 사용할 수 있어요.',
        undefined,
        'px-[2rem] bottom-[8.4rem]',
      );
    }
  };

  return (
    <section className='bg-black-1'>
      {/* 상품 캐러셀 */}
      <ImageCarousel variant='dots' images={productImages} />
      <div className='flex flex-col gap-[0.8rem] px-[2rem] py-[1.6rem]'>
        {/* 설명, 가격, 좋아요 */}
        <div className='flex flex-col'>
          <div className='flex justify-between'>
            <h1 className='font-16-md text-black-10'>{title}</h1>
            <div className='flex items-start h-[2.4rem]'>
              <LikeButton isLiked={isLiked} handleClick={handleLike} className='h-[2rem]' />
              <span className='font-16-md text-black-8'>{likeCount}</span>
            </div>
          </div>
          <span className='title-20-md text-black-10'>{formatPrice(price)}원~</span>
        </div>
        {/* 무드 */}
        <div className='flex gap-[0.4rem]'>
          {moods.map((mood) => <TagChip key={mood} variant='gray' label={mood} />)}
        </div>
        {/* 별점, 리뷰 수 */}
        <div className='flex gap-[0.6rem] caption-12-rg text-black-7'>
          <div className='flex items-center gap-[0.1rem]'>
            <IconStar className='w-[1rem] h-[1rem]' />
            <span>{averageRate}</span>
          </div>
          <span>리뷰 {reviewCount}</span>
        </div>
      </div>
    </section>
  );
}
