'use client';

import { cn } from '@snappin/design-system/lib';
import { IconStar } from '@snappin/design-system/assets';
import { TagChip, LikeButton, ImageWithShadow } from '@snappin/design-system';
import { ProductCardProps, RemUnit } from '@snappin/shared/types';

type ProductFrameProps = ProductCardProps & {
  isLiked: boolean;
  handleClickLike: () => void;
  imageHeight?: RemUnit;
  width?: RemUnit;
};

export default function ProductFrame({
  image,
  name,
  rate,
  reviewCount,
  photographer,
  price,
  moods = [],
  isLiked,
  width = '18.6rem',
  imageHeight = '18.4rem',
  handleClickLike,
}: ProductFrameProps) {
  return (
    <div className='flex flex-col overflow-hidden' style={{ width: width }}>
      <div className='relative overflow-hidden'>
        <ImageWithShadow
          src={image.src}
          alt={image.alt ?? '제품 이미지'}
          imageHeight={imageHeight}
          imageWidth={width}
        />
        <div className='absolute right-0 bottom-0 flex items-center p-[1rem]'>
          <LikeButton
            isLiked={isLiked}
            handleClick={handleClickLike}
            aria-label={isLiked ? '좋아요 취소' : '좋아요'}
            className={cn('h-[1.4rem] w-[1.4rem]', isLiked ? 'text-neon-black' : 'text-black-1')}
          />
        </div>
      </div>
      {/* 제품 정보 */}
      <div className='flex w-full flex-col items-center items-start overflow-hidden p-[1.2rem]'>
        <div className='mb-[0.8em] flex w-full flex-col overflow-hidden'>
          <p className='caption-11-md truncate'>{name}</p>
          <span className='caption-14-bd'>{price}원~</span>
        </div>

        <div className='mb-[0.7rem] flex w-full items-center gap-[0.2rem] overflow-hidden'>
          {moods.map((mood) => (
            <TagChip key={mood} variant='gray' label={mood} />
          ))}
        </div>

        <div className='text-black-7 flex w-full min-w-0 items-center gap-[0.8rem] overflow-hidden'>
          <span className='caption-9-rg block min-w-0 truncate'>{photographer}</span>
          <div className='flex shrink-0 items-center gap-[0.4rem]'>
            <div className='flex shrink-0 items-center gap-[0.2rem]'>
              <IconStar className='h-[0.8rem] w-[0.8rem]' />
              <span className='caption-9-rg'>{rate}</span>
            </div>
            <span className='caption-9-rg'>리뷰({reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
