'use client';

import { useState } from 'react';
import { IconButton } from '@/ui';
import { IconHeart, IconHeartFill, IconStar } from '@/assets';
import { formatNumberWithComma } from '@/utils/formatNumberWithComma';
import { ProductCarousel } from '../components/index';

type ProductMainSectionProps = {
  id: number;
  images: string[],
  title: string,
  initialIsLiked: boolean,
  averageRate: number,
  reviewCount: number,
  price: number,
  photographer: string,
}

export default function ProductMainSection({
  id,
  images,
  title,
  initialIsLiked,
  averageRate,
  reviewCount,
  price,
  photographer
}: ProductMainSectionProps) {
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
  const productImages = images.map((image, idx) => ({ src: image, alt: `${title} 상품 이미지 ${idx}` }));

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    // TODO: 상품 좋아요 API 연동 (request에 id 전달)
  }

  return (
    <section>
      <ProductCarousel images={productImages} />
      <div className='flex flex-col gap-[0.8rem] px-[2rem] py-[1.6rem]'>
        <div className='flex flex-col'>
          {/* 상품명, 좋아요 */}
          <div className='flex justify-between items-center'>
            <span className='font-16-bd text-black-10'>{title}</span>
            <div className='flex justify-end items-center gap-[1rem] w-[4.4rem] h-[3rem]'>
              <IconButton className='w-[2.4rem] h-[2.4rem]' onClick={handleLike}>
                {isLiked ? <IconHeartFill /> : <IconHeart />}
              </IconButton>
            </div>
          </div>
          {/* 별점, 리뷰 수, 작가명*/}
          <div className='flex flex-col gap-[0.4rem]'>
            <div className='flex gap-[0.6rem]'>
              <div className='flex gap-[0.1rem]'>
                <IconStar className='w-[1.2rem] h-[1.2rem] text-black-8' />
                <span className='caption-12-md text-black-8'>{averageRate}</span>
              </div>
              <span className='caption-12-md text-black-10'>리뷰 {reviewCount}</span>
            </div>
            <span className='caption-12-md text-black-7'>{photographer}</span>
          </div>
        </div>
        {/* 가격 */}
        <span className='title-20-bd text-black-10'>{formatNumberWithComma(price)}원~</span>
      </div>
    </section>
  );
}