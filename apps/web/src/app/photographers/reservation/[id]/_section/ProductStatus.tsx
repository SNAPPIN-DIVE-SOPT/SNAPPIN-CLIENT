'use client';

import { useState } from 'react';
import { Button } from '@snappin/design-system';
import { useToast } from '@/ui';
import { ProductCard } from '@/ui/product-card';
import { useRefuseReservation } from '../api';
import RefuseModal from '../@modal/(.)refuse-modal/RefuseModal';
import { Section } from '@/components/layout/reservation/SectionLayout';
import { STATE_CODES, StateCode } from '@snappin/shared/types';

type ProductStatusProps = {
  reservationId: number;
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
  reservationId,
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

  const { mutate: refuseReservation } = useRefuseReservation();
  const [isRefuseModalOpen, setIsRefuseModalOpen] = useState(false);

  const handleRefuse = () => {
    setIsRefuseModalOpen(true);
  };

  const handleConfirmRefuse = () => {
    refuseReservation(reservationId);
    setIsRefuseModalOpen(false);
  };

  const handleSendMessage = () => {
    toast.alert('메시지 기능은 준비 중이에요. 조금만 기다려주세요!', undefined, 'bottom-[2rem]');
  };

  return (
    <Section title='예약 요청 상품'>
      <ProductCard
        preload
        image={{ src: imageUrl, alt: title }}
        name={title}
        rate={rate}
        reviewCount={reviewCount}
        photographer={photographer}
        price={price}
        moods={moods}
      />

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
      <RefuseModal
        open={isRefuseModalOpen}
        handleOpenChange={setIsRefuseModalOpen}
        handleClickConfirm={handleConfirmRefuse}
      />
    </Section>
  );
}
