'use client';

import { ProductCard } from '@/ui/product-card';
import { MoodCode } from '@/types/moodCode';
import { StateCode } from '@/types/stateCode';
import Button from '@/ui/button/base/Button';

type ProductStatusProps = {
  id: number;
  imageUrl: string;
  title: string;
  rate: number;
  reviewCount: number;
  photographer: string;
  price: number;
  moods: MoodCode[];
  status: StateCode;
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
  status,
}: ProductStatusProps) {
  const handleRefuse = () => {
    //TODO: 예약 거절 기능 구현
    console.info('예약 거절', id);
  };

  const handleSendMessage = () => {
    //TODO: 메시지 기능은 준비 중 이에요. 조금만 기다려주세요! -> toast 띄우기
  };

  return (
    <div className='bg-black-1 flex flex-col px-[2rem] pt-[1.7rem] pb-[1.2rem]'>
      <p className='caption-14-bd'>예약 요청 상품</p>
      <div className='w-full pt-[1.2rem]'>
        <ProductCard
          image={{ src: imageUrl, alt: title }}
          name={title}
          rating={rate}
          reviewCount={reviewCount}
          author={photographer}
          price={price}
          tags={moods}
        />
      </div>
      <div className='flex w-full items-center gap-[0.6rem] pt-[1.7rem]'>
        {status !== 'RESERVATION_CONFIRMED' && status !== 'RESERVATION_REFUSED' && (
          <Button
            size='small'
            color='white'
            className='text-black-10 w-full'
            onClick={handleRefuse}
          >
            예약 거절
          </Button>
        )}

        <Button
          size='small'
          color='black'
          className='text-black-1 w-full'
          onClick={handleSendMessage}
        >
          메시지 보내기
        </Button>
      </div>
    </div>
  );
}
