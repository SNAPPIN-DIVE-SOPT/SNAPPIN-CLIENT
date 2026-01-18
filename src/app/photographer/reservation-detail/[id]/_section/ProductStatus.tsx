'use client';

import { STATE_CODES, StateCode } from '@/types/stateCode';
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
  const toast = useToast();
  const isRefusable =
    status !== STATE_CODES.RESERVATION_CONFIRMED &&
    status !== STATE_CODES.RESERVATION_CANCELED &&
    status !== STATE_CODES.RESERVATION_REFUSED &&
    status !== STATE_CODES.SHOOT_COMPLETED;

  const handleRefuse = () => {
    //TODO: 예약 거절 기능 구현
    console.info('예약 거절', id);
  };

  const handleSendMessage = () => {
    toast.alert('메시지 기능은 준비 중이에요. 조금만 기다려주세요!', undefined, 'top-[1rem]');
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
      <div className='flex w-full items-center gap-[0.6rem] pt-[1.7rem]'>
        {isRefusable && (
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
          className='text-black-1 border-black-10 w-full border-1'
          onClick={handleSendMessage}
        >
          메시지 보내기
        </Button>
      </div>
    </div>
  );
}
