'use client';

import { IconButton } from '@/ui';
import { useToast } from '@/ui/toast/hooks/useToast';
import { useAuth } from '@/auth/hooks/useAuth';
import { IconHeart, IconHeartFill, IconStar } from '@/assets';
import { formatNumberWithComma } from '@/utils/formatNumberWithComma';
import { ProductCarousel } from '../components/index';
import { useWishProduct } from '../api';

type ProductMainSectionProps = {
  id: number;
  images: string[];
  title: string;
  isLiked: boolean;
  averageRate: number;
  reviewCount: number;
  price: number;
  photographer: string;
};

export default function ProductMainSection({
  id,
  images,
  title,
  isLiked,
  averageRate,
  reviewCount,
  price,
  photographer,
}: ProductMainSectionProps) {
  const { mutateAsync } = useWishProduct();
  const { isLogIn } = useAuth();
  const toast = useToast();

  const productImages = images.map((image, idx) => ({
    src: image,
    alt: `${title} 상품 이미지 ${idx}`,
  }));

  const handleLike = async () => {
    if (isLogIn) {
      mutateAsync(id);
    } else if(isLogIn===false) {
      toast.login(
        '좋아요 기능은 로그인 후에 사용할 수 있어요.',
        undefined,
        'px-[2rem] bottom-[8.4rem]',
      );
    }
  };

  return (
    <section>
      <ProductCarousel images={productImages} />
      <div className='flex flex-col gap-[0.8rem] px-[2rem] py-[1.6rem]'>
        <div className='flex flex-col'>
          {/* 상품명, 좋아요 */}
          <div className='flex items-center justify-between'>
            <span className='font-18-bd text-black-10'>{title}</span>
            <div className='flex h-[3rem] w-[4.4rem] items-center justify-end gap-[1rem]'>
              <IconButton className='h-[2.4rem] w-[2.4rem]' onClick={handleLike}>
                {isLiked ? <IconHeartFill /> : <IconHeart />}
              </IconButton>
            </div>
          </div>
          {/* 별점, 리뷰 수, 작가명*/}
          <div className='flex flex-col gap-[0.4rem]'>
            <div className='flex items-center gap-[0.6rem]'>
              <div className='flex items-center gap-[0.1rem]'>
                <IconStar className='text-black-8 h-[1.2rem] w-[1.2rem]' />
                <span className='caption-14-rg text-black-8'>{averageRate}</span>
              </div>
              <span className='caption-14-rg text-black-10'>리뷰 {reviewCount}</span>
            </div>
            <span className='caption-14-md text-black-7'>{photographer}</span>
          </div>
        </div>
        {/* 가격 */}
        <span className='title-20-bd text-black-10'>{formatNumberWithComma(price)}원~</span>
      </div>
    </section>
  );
}
