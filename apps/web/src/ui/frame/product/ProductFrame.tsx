'use client';

import Link from 'next/link';
import { type CSSProperties } from 'react';
import { IconStar } from '@snappin/design-system/assets';
import { TagChip, ImageWithShadow } from '@snappin/design-system';
import { ProductCardProps } from '@snappin/shared/types';
import ProductClient from '../components/Product.client';
import { formatPrice } from '@snappin/shared/lib';

type CssSize = CSSProperties['width'];

export type ProductFrameProps = ProductCardProps & {
  id: number;
  isLiked: boolean;
  imageHeight?: CssSize;
  width?: CssSize;
};

export default function ProductFrame({
  id,
  image,
  name,
  rate,
  reviewCount,
  photographer,
  price,
  moods = [],
  isLiked,
  width = '100%',
  imageHeight = '18.4rem',
}: ProductFrameProps) {
  return (
    <Link
      href={`/product/${id}`}
      className='flex flex-col overflow-hidden'
      style={{ width: width }}
    >
      <div className='relative overflow-hidden'>
        <ImageWithShadow
          src={image.src}
          alt={image.alt ?? '제품 이미지'}
          imageHeight={imageHeight}
          imageWidth={width}
        />

        <div className='absolute right-0 bottom-0 flex items-center p-[1rem]'>
          <ProductClient id={id} isLiked={isLiked} />
        </div>
      </div>
      <div className='flex w-full flex-col items-start overflow-hidden p-[1.2rem]'>
        <div className='mb-[0.8rem] flex w-full flex-col overflow-hidden'>
          <p className='caption-11-md truncate'>{name}</p>
          <span className='caption-14-bd'>{formatPrice(price)}원~</span>
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
    </Link>
  );
}
