import Image from 'next/image';
import type { HTMLAttributes } from 'react';
import { cn } from '@snappin/design-system/lib';
import { TagChip } from '@snappin/design-system';
import { formatPrice } from '@snappin/shared/lib';
import { IconStar } from '@snappin/design-system/assets';
import { ProductCardProps } from '@snappin/shared/types';

type ProductCardRootProps = ProductCardProps & HTMLAttributes<HTMLDivElement>;

export default function ProductCard({
  preload = false,
  image,
  name,
  rate,
  reviewCount,
  photographer,
  price,
  moods = [],
  className,
  ...props
}: ProductCardRootProps) {
  return (
    <div className={cn('flex gap-[1rem] w-full', className)} {...props}>
      {/* 좌측 상품 이미지 */}
      <div className='relative w-[9rem] h-[9rem] shrink-0 rounded-[0.4rem] overflow-hidden'>
        <Image
          fill
          alt={image.alt ?? ''}
          src={image.src ?? '/imgs/default-image.png'}
          sizes='9rem'
          className='object-cover'
          preload={preload}
        />
      </div>
      {/* 우측 상품 정보 */}
      <div className='flex flex-col gap-[0.8rem] min-w-0'>
        {/* 이름, 가격 */}
        <div className='flex flex-col gap-[0.2rem] text-black-10'>
          <span className='caption-12-md truncate'>{name}</span>
          <span className='font-16-sb truncate'>{formatPrice(price)}원~</span>
        </div>
        {/* 무드, 작가, 별점, 리뷰 */}
        <div className='flex flex-col gap-[0.8rem]'>
          <div className='flex gap-[0.4rem]'>
            {moods.map((mood) => <TagChip key={mood} variant='gray' label={mood} />)}
          </div>
          <div className='flex gap-[1.2rem] caption-12-rg text-black-7'>
            <span>{photographer}</span>
            <div className='flex gap-[0.6rem]'>
              <div className='flex gap-[0.2rem]'>
                <IconStar className='w-[1rem] h-full'/>
                <span>{rate}</span>
              </div>
              <span>리뷰 {reviewCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
