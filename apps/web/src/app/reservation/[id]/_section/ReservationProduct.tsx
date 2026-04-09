'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@snappin/design-system';
import { STATE_CODES, type StateCode } from '@snappin/shared/types';
import { useToast } from '@/ui';
import { ProductCard } from '@/ui/product-card';
import { Section } from '@/components/layout/reservation/SectionLayout';
import { ROUTES } from '@/constants/routes/routes';

type ReservationProductProps = {
  id?: number;
  imageUrl?: string;
  title?: string;
  rate?: number;
  reviewCount?: number;
  photographer?: string;
  price?: number;
  moods?: string[];
  reservationStatus: StateCode;
  hasReview?: boolean;
  handleReservationCancelClick?: () => void;
  handleInquiryClick?: () => void;
};

export default function ReservationProduct({
  id = 0,
  imageUrl = '',
  title = '',
  rate = 0,
  reviewCount = 0,
  photographer = '',
  price = 0,
  moods = [],
  reservationStatus,
  hasReview,
  handleReservationCancelClick,
  handleInquiryClick,
}: ReservationProductProps) {
  const toast = useToast();
  const router = useRouter();

  const hasCancelButton =
    reservationStatus !== STATE_CODES.RESERVATION_REFUSED &&
    reservationStatus !== STATE_CODES.RESERVATION_CANCELED;

  const handleWriteReview = () => {
    router.replace(ROUTES.REVIEW_FORM(id));
  };

  const handleSendMessage = () => {
    toast.alert('메시지 기능은 준비 중이에요. 조금만 기다려주세요!', undefined, 'bottom-[2rem]');
  };

  // 촬영 완료 상태 정의
  const isPhotoFinal = reservationStatus === STATE_CODES.SHOOT_COMPLETED;
  const hasWrittenReview = hasReview === true;

  const shouldShowReviewActionButtons = isPhotoFinal && !hasWrittenReview;
  const shouldShowInquiryOnlyActionButton = isPhotoFinal && hasWrittenReview;
  const shouldShowReservationActionButtons = !isPhotoFinal;

  return (
    <Section title={isPhotoFinal ? '촬영 완료' : '예약 요청 상품'}>
      <ProductCard
        image={{ src: imageUrl, alt: title }}
        name={title}
        rate={rate}
        reviewCount={reviewCount}
        photographer={photographer}
        price={price}
        moods={moods}
      />

      {shouldShowReservationActionButtons && (
        <div className='mt-[1.7rem] flex flex-row gap-[0.6rem]'>
          {hasCancelButton && (
            <Button
              size='small'
              color='white'
              display='inline'
              className='w-full'
              onClick={handleReservationCancelClick}
            >
              예약 취소
            </Button>
          )}

          <Button
            size='small'
            color='black'
            display='inline'
            className='w-full'
            onClick={handleInquiryClick}
          >
            문의하기
          </Button>
        </div>
      )}

      {shouldShowReviewActionButtons && (
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
      )}

      {shouldShowInquiryOnlyActionButton && (
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
