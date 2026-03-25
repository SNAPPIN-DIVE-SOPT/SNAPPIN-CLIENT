'use client';

import { cn } from '@snappin/design-system/lib';
import { IconStar } from '@snappin/design-system/assets';
import { LikeButton, ImageWithShadow } from '@snappin/design-system';
import { ProductCardProps, RemUnit } from '@snappin/shared/types';

type ProductInformationFrameProps = ProductCardProps & {
  isLiked: boolean;
  handleClickLike: () => void;
  height?: RemUnit;
  width?: RemUnit;
};

export default function ProductInformationFrame({
  image,
  name,
  rate,
  reviewCount,
  photographer,
  price,
  isLiked,
  width = '18.65rem',
  height = '26.6rem',
  handleClickLike,
}: ProductInformationFrameProps) {
  return (
    <div className='relative w-fit overflow-hidden'>
      <ImageWithShadow
        src={image.src}
        alt={image.alt ?? '제품 이미지'}
        imageHeight={height}
        imageWidth={width}
      />
      <div className='absolute right-0 bottom-0 flex w-full flex-col items-center gap-[0.8rem] p-[1.2rem]'>
        <div className='text-black-1 flex w-full flex-col'>
          <p className='caption-11-md truncate'>{name}</p>
          <span className='caption-14-bd'>{price}원~</span>
        </div>
        <div className='text-black-4 flex w-full min-w-0 items-center gap-[0.8rem]'>
          <div className='flex min-w-0 flex-1 items-center gap-[0.8rem]'>
            <span className='caption-9-rg block min-w-0 truncate'>{photographer}</span>
            <div className='flex shrink-0 items-center gap-[0.4rem]'>
              <div className='flex shrink-0 items-center gap-[0.2rem]'>
                <IconStar className='h-[0.8rem] w-[0.8rem]' />
                <span className='caption-9-rg'>{rate}</span>
              </div>
              <span className='caption-9-rg'>리뷰({reviewCount})</span>
            </div>
          </div>
          <LikeButton
            isLiked={isLiked}
            handleClick={handleClickLike}
            aria-label={isLiked ? '좋아요 취소' : '좋아요'}
            className={cn('h-[1.4rem] w-[1.4rem]', isLiked ? 'text-neon-black' : 'text-black-1')}
          />
        </div>
      </div>
    </div>
  );
}
