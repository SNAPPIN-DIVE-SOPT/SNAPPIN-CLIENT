'use client';

import { useEffect } from 'react';
import { Divider } from '@/ui';
import { EmptyView, ReservationCard } from '../components';
import { RESERVATION_MOCK } from '../mock/reservationList.mock';
import { STATE_CODES, StateCode } from '@/types/stateCode';
import { useToast } from '@/ui/toast/hooks/useToast';

export default function ShootCompletedListSection() {
  const data = RESERVATION_MOCK.reservations;
  const toast = useToast();

  const isShootCompletedListEmpty = data.length === 0;

  const isLoggedIn = false;

  useEffect(() => {
    if (isLoggedIn) return;
    toast.login('예약 기능은 로그인 후에 사용할 수 있어요.', undefined, 'bottom-[8.6rem]');
  }, [isLoggedIn, toast]);

  if (isShootCompletedListEmpty || !isLoggedIn) {
    return (
      <EmptyView
        title='촬영 완료된 상품이 없어요'
        description='&#39;탐색&#39;에서 다양한 상품을 확인해 보세요'
      />
    );
  }

  return (
    <section className='flex flex-col gap-[1.2rem] p-[1.6rem]'>
      {data.map(({ reservation }, reservationIndex) => {
        // 리뷰 버튼 필요 여부 판단
        const reviewWriteHref =
          reservation.status === STATE_CODES.SHOOT_COMPLETED && !reservation.product.isReviewed
            ? `/review/write/${reservation.reservationId}`
            : undefined;

        return (
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
              reservationId={reservation.reservationId}
              isReviewed={reservation.product.isReviewed}
            />
            {reservationIndex !== data.length - 1 && (
              <Divider thickness='large' color='bg-black-3' className='-mx-[1.6rem] mt-[1.6rem]' />
            )}
          </div>
        );
      })}
    </section>
  );
}
