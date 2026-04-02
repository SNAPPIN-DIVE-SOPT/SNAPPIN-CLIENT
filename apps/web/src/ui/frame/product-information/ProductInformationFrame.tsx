import { CSSProperties } from 'react';
import { IconStar } from '@snappin/design-system/assets';
import { ImageWithShadow } from '@snappin/design-system';
import { ProductCardProps } from '@snappin/shared/types';
import ProductClient from '../components/Product.client';

type CssSize = CSSProperties['width'];

export type ProductInformationFrameProps = ProductCardProps & {
  id: number;
  isLiked: boolean;
  height?: CssSize;
  width?: CssSize;
  imageClassName?: string;
};

export default function ProductInformationFrame({
  image,
  name,
  rate,
  reviewCount,
  photographer,
  price,
  id,
  isLiked,
  width = '100%',
  height = '26.6rem',
  imageClassName,
}: ProductInformationFrameProps) {
  return (
    <div className='relative overflow-hidden' style={{ width }}>
      <ImageWithShadow
        src={image.src}
        alt={image.alt ?? '제품 이미지'}
        imageHeight={height}
        imageWidth={width}
        className={imageClassName}
      />
      <div className='absolute right-0 bottom-0 flex w-full flex-col items-center gap-[0.8rem] p-[1.2rem]'>
        <div className='text-black-1 flex w-full flex-col'>
          <p className='caption-11-md truncate'>{name}</p>
          <span className='caption-14-bd'>{price}원~</span>
        </div>

        <div className='text-black-4 flex w-full min-w-0 items-center gap-[0.8rem]'>
          <div className='flex min-w-0 flex-1 items-center gap-[0.8rem] overflow-hidden'>
            <span className='caption-9-rg block min-w-0 truncate'>{photographer}</span>

            <div className='flex shrink-0 items-center gap-[0.4rem]'>
              <div className='flex shrink-0 items-center gap-[0.2rem]'>
                <IconStar className='h-[0.8rem] w-[0.8rem]' />
                <span className='caption-9-rg'>{rate}</span>
              </div>
              <span className='caption-9-rg'>리뷰({reviewCount})</span>
            </div>
          </div>
          <div className='shrink-0'>
            <ProductClient id={id} isLiked={isLiked} />
          </div>
        </div>
      </div>
    </div>
  );
}
