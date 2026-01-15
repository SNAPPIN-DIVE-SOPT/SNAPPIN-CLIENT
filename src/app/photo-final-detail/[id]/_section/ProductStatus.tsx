'use client';

import { Button, ProductCard } from '@/ui';
import { useToast } from '@/ui/toast/hooks/useToast';

type ProductStatusProps = {
  id: number;
  imageUrl: string;
  title: string;
  rate: number;
  reviewCount: number;
  photographer: string;
  price: number;
  moods: string[];
  hasReview: boolean;
};

export default function ProductStatus({
  id,
  imageUrl,
  title,
  rate,
  reviewCount,
  photographer,
  price,
  moods,
  hasReview,
}: ProductStatusProps) {
  const toast = useToast();

  const handleWriteReview = () => {
    //TODO: 리뷰 작성 기능 구현
    console.info('리뷰 작성', id);
  };

  const handleSendMessage = () => {
    toast.alert('메시지 기능은 준비 중 이에요. 조금만 기다려주세요!', undefined, 'bottom-[2rem]');
  };

  return (
    <div className='bg-black-1 flex flex-col px-[2rem] pt-[1.7rem] pb-[1.2rem]'>
      <p className='caption-14-bd'>예약 요청 상품</p>
      <div className='w-full pt-[1.2rem]'>
        <ProductCard
          image={{ src: imageUrl, alt: title }}
          name={title}
          rate={rate}
          reviewCount={reviewCount}
          photographer={photographer}
          price={price}
          moods={moods}
        />
      </div>

      {!hasReview ? (
        <div className='flex w-full items-center gap-[0.6rem] pt-[1.7rem]'>
          <Button
            size='small'
            color='transparent'
            className='text-black-10 w-full'
            onClick={handleSendMessage}
          >
            문의하기
          </Button>
          <Button
            size='small'
            color='black'
            className='border-black-10 w-full border'
            onClick={handleWriteReview}
          >
            리뷰 작성
          </Button>
        </div>
      ) : (
        <div className='flex w-full items-center gap-[0.6rem] pt-[1.7rem]'>
          <Button
            size='small'
            color='black'
            className='text-black-1 border-black-10 w-full border'
            onClick={handleSendMessage}
          >
            문의하기
          </Button>
        </div>
      )}
    </div>
  );
}
