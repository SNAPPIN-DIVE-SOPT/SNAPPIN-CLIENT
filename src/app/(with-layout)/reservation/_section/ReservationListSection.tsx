'use client';

import { useEffect } from 'react';
import { Divider } from '@/ui';
import { EmptyView, ReservationCard } from '../components';
import { RESERVATION_MOCK } from '../mock/reservationList.mock';
import { useToast } from '@/ui/toast/hooks/useToast';
import { StateCode } from '@/types/stateCode';

export default function ReservationListSection() {
  const data = RESERVATION_MOCK.reservations;
  const toast = useToast();

  const isReservationListEmpty = data.length === 0;

  const isLoggedIn = false;

  useEffect(() => {
    if (isLoggedIn) return;
    toast.login('예약 기능은 로그인 후에 사용할 수 있어요.', undefined, 'bottom-[8.6rem]');
  }, [isLoggedIn, toast]);

  if (isReservationListEmpty || !isLoggedIn) {
    return (
      <EmptyView
        title='예약 문의한 상품이 없어요'
        description='&#39;탐색&#39;에서 다양한 상품을 확인해 보세요'
      />
    );
  }

  return (
    <section className='flex flex-col gap-[1.2rem] p-[1.2rem]'>
      {data.map(({ reservation }, reservationIndex) => (
        <div key={reservation.reservationId}>
          <ReservationCard
            image={{ src: reservation.product.imageUrl, alt: reservation.product.title }}
            name={reservation.product.title}
            rate={reservation.product.rate}
            reviewCount={reservation.product.reviewCount}
            photographer={reservation.product.photographer}
            price={reservation.product.price}
            moods={reservation.product.moods}
            status={reservation.status as StateCode}
            date={reservation.createdAt}
            href={`/reservation-detail/${reservation.reservationId}`}
            isReviewed={reservation.product.isReviewed}
          />
          {reservationIndex !== data.length - 1 && (
            <Divider thickness='large' color='bg-black-3' className='-mx-[2rem] mt-[1.2rem]' />
          )}
        </div>
      ))}
    </section>
  );
}
