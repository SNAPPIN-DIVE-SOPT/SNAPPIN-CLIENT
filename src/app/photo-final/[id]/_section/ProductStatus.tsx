'use client';

import { useRouter } from 'next/navigation';
import { Button, ProductCard } from '@/ui';
import { useToast } from '@/ui/toast/hooks/useToast';
import { Section } from '@/components/layout/reservation/SectionLayout';
import { ROUTES } from '@/constants/routes/routes';

type ProductStatusProps = {
  id?: number;
  imageUrl?: string;
  title?: string;
  rate?: number;
  reviewCount?: number;
  photographer?: string;
  price?: number;
  moods?: string[];
  hasReview: boolean;
};

export default function ProductStatus({
  id = 0,
  imageUrl = '',
  title = '',
  rate = 0,
  reviewCount = 0,
  photographer = '',
  price = 0,
  moods = [],
  hasReview,
}: ProductStatusProps) {
  const toast = useToast();
  const router = useRouter();

  const handleWriteReview = () => {
    router.replace(ROUTES.REVIEW_FORM(id));
  };

  const handleSendMessage = () => {
    toast.alert('메시지 기능은 준비 중이에요. 조금만 기다려주세요!', undefined, 'bottom-[2rem]');
  };

  return (
    <Section title='예약 요청 상품'>
      <ProductCard
        image={{ src: imageUrl, alt: title }}
        name={title}
        rate={rate}
        reviewCount={reviewCount}
        photographer={photographer}
        price={price}
        moods={moods}
      />

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
    </Section>
  );
}
