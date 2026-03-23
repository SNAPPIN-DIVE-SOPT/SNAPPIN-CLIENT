import type { HTMLAttributes } from 'react';
import Image from 'next/image';
import { ProductCardProps } from '@snappin/shared/types';
import { cn } from '../../lib/cn';
import { IconStar } from '../../assets';
import { formatPrice } from '@snappin/shared/lib';
import { TagChip } from '..';

const PRODUCT_PLACEHOLDER = '/imgs/image-default.png';
type ProductCardRootProps = ProductCardProps & HTMLAttributes<HTMLDivElement>;

export default function ProductCard({
  preload = false,
  image,
  name,
  rate,
  reviewCount,
  photographer,
  price,
  moods,
  className,
  ...props
}: ProductCardRootProps) {
  return (
    <div className={cn('flex w-full gap-[1.2rem]', className)} {...props}>
      <div className='relative h-[10.2rem] w-[10.2rem] shrink-0'>
        <Image
          src={image.src === '' ? PRODUCT_PLACEHOLDER : image.src}
          alt={image.alt ?? `${name} 상품 이미지`}
          fill
          className='rounded-[0.4rem] object-cover'
          preload={preload}
        />
      </div>
      <div className='flex min-w-0 flex-col gap-[0.3rem]'>
        <div className='flex flex-col gap-[0.5rem]'>
          <span className='caption-14-bd text-black-10 truncate'>{name}</span>
          <div className='flex flex-col gap-[0.3rem]'>
            <div className='flex gap-[0.6rem]'>
              <div className='flex items-center gap-[0.2rem]'>
                <IconStar className='text-black-8 h-[1rem] w-[1rem]' />
                <span className='caption-12-md text-black-8'>{Number(rate).toFixed(1)}</span>
              </div>
              <div className='flex items-center gap-[0.3rem]'>
                <span className='caption-12-md text-black-10 text-right'>리뷰 {reviewCount}</span>
              </div>
            </div>
            <span className='caption-12-md text-black-7 w-[19rem] truncate'>{photographer}</span>
          </div>
        </div>
        <span className='font-16-md text-black-10'>{formatPrice(price)}원</span>
        <div className='scrollbar-hide flex gap-[0.4rem] overflow-scroll'>
          {moods.map((tag) => (
            <TagChip key={tag} variant='neon' label={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}
