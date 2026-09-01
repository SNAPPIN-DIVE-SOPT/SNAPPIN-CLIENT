import Image from 'next/image';
import type { HTMLAttributes } from 'react';
import { cn } from '@snappin/design-system/lib';
import { TagChip } from '@snappin/design-system';
import { formatPrice } from '@snappin/shared/lib';
import { IconStar } from '@snappin/design-system/assets';
import { ProductCardProps } from '@snappin/shared/types';

type CardRootProps = ProductCardProps & HTMLAttributes<HTMLDivElement>;

export default function Card({
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
}: CardRootProps) {
  return (
    <div className={cn('flex w-full gap-[1rem]', className)} {...props}>
      {/* 좌측 상품 이미지 */}
      <div className='relative h-[9rem] w-[9rem] shrink-0 overflow-hidden rounded-[0.4rem]'>
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
      <div className='flex min-w-0 flex-col gap-[0.8rem]'>
        {/* 이름, 가격 */}
        <div className='text-black-10 flex flex-col gap-[0.2rem]'>
          <span className='caption-12-md truncate'>{name}</span>
          <span className='font-16-sb truncate'>{formatPrice(price)}원~</span>
        </div>
        {/* 무드, 작가, 별점, 리뷰 */}
        <div className='flex flex-col gap-[0.8rem]'>
          <div className='flex gap-[0.4rem]'>
            {moods.map((mood) => (
              <TagChip key={mood} variant='gray' label={mood} />
            ))}
          </div>
          <div className='caption-12-rg text-black-7 flex gap-[1.2rem]'>
            <span>{photographer}</span>
            <div className='flex gap-[0.6rem]'>
              <div className='flex gap-[0.2rem]'>
                <IconStar className='h-full w-[1rem]' />
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
