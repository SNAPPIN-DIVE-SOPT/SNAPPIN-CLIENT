'use client';

import { useState } from 'react';
import type { ComponentProps } from 'react';

import { RESERVATION_MOCK } from '@/app/client/(with-layout)/reservation/mock/reservationList.mock';
import type { StateCode } from '@/types/stateCode';
import { Button, ConfirmModal, ProductCard } from '@/ui';

type ReservationRequestedProps = {
  reservationProductId: number;
  reservationStatus: StateCode;
  handleReservationCancelClick: () => void;
  handleInquiryClick: () => void;
};

type ReservationMockReservation = (typeof RESERVATION_MOCK.reservations)[number]['reservation'];

const createProductCardPropsByReservation = (
  reservation: ReservationMockReservation,
): ComponentProps<typeof ProductCard> => ({
  image: {
    src: reservation.product.imageUrl,
    alt: `${reservation.product.title} 상품 이미지`,
  },
  name: reservation.product.title,
  rating: reservation.product.rate,
  reviewCount: reservation.product.reviewCount,
  author: reservation.product.photographer,
  price: reservation.product.price,
  tags: reservation.product.moods,
  className: 'w-full',
});

export default function ReservationRequested({
  reservationProductId,
  reservationStatus,
  handleReservationCancelClick,
  handleInquiryClick,
}: ReservationRequestedProps) {
  const [isReservationCancelConfirmModalOpen, setIsReservationCancelConfirmModalOpen] =
    useState(false);
  const selectedReservation =
    RESERVATION_MOCK.reservations.find(
      ({ reservation }) => reservation.reservationId === reservationProductId,
    )?.reservation ?? RESERVATION_MOCK.reservations[0].reservation;

  const reservations = selectedReservation ? [selectedReservation] : [];
  const hasReservationCancelButton = reservationStatus !== 'RESERVATION_CANCELED';
  const inquiryButtonColor = reservationStatus === 'RESERVATION_CANCELED' ? 'transparent' : 'black';

  const handleReservationCancelButtonClick = () => {
    setIsReservationCancelConfirmModalOpen(true);
  };

  const handleReservationCancelConfirmModalCloseClick = () => {
    setIsReservationCancelConfirmModalOpen(false);
  };

  const handleReservationCancelConfirmClick = () => {
    handleReservationCancelClick();
    setIsReservationCancelConfirmModalOpen(false);
  };

  return (
    <>
      <ConfirmModal
        open={isReservationCancelConfirmModalOpen}
        handleOpenChange={setIsReservationCancelConfirmModalOpen}
        showCloseButton={false}
        title={'예약하신 스냅 일정을\n취소할까요?'}
        buttons={[
          {
            label: '아니요',
            size: 'medium',
            color: 'disabled',
            type: 'button',
            onClick: handleReservationCancelConfirmModalCloseClick,
          },
          {
            label: '네, 취소할게요',
            size: 'medium',
            color: 'black',
            type: 'button',
            onClick: handleReservationCancelConfirmClick,
          },
        ]}
        titleClassName='text-center'
      />
      <section className='bg-black-1 px-[2rem] pt-[1.7rem] pb-[1.2rem]'>
        <span className='caption-14-bd text-black-10'>예약 요청 상품</span>
        <div className='mt-[1.2rem] mb-[1.7rem]'>
          {reservations.map((reservation) => (
            <ProductCard
              key={reservation.reservationId}
              {...createProductCardPropsByReservation(reservation)}
            />
          ))}
        </div>
        <div className='flex flex-row gap-[0.6rem]'>
          {hasReservationCancelButton ? (
            <Button
              size='small'
              color='white'
              display='inline'
              type='button'
              className='w-full'
              onClick={handleReservationCancelButtonClick}
            >
              예약 취소
            </Button>
          ) : null}
          <Button
            size='small'
            color={inquiryButtonColor}
            display='inline'
            type='button'
            className='w-full'
            onClick={handleInquiryClick}
          >
            문의하기
          </Button>
        </div>
      </section>
    </>
  );
}
