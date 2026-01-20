'use client';

import { useEffect } from 'react';
import { Divider, ProductCardSkeleton } from '@/ui';
import { EmptyView, ReservationCard } from '../components';
import { StateCode } from '@/types/stateCode';
import { useToast } from '@/ui/toast/hooks/useToast';
import { useGetReservationList } from '../api';
import { RESERVATION_TAB } from '../constants/tabs';
import { ACCESS_TOKEN_COOKIE_NAME } from '@/auth/constant/cookie';
import { useAuth } from '@/auth/hooks/useAuth';
import { formatCreatedAt } from '@/utils/formatNumberWithComma';

export default function ShootCompletedListSection() {
  const hasAccessToken =
    typeof document !== 'undefined' && document.cookie.includes(`${ACCESS_TOKEN_COOKIE_NAME}=`);
  const { data, isPending } = useGetReservationList(RESERVATION_TAB.CLIENT_DONE, hasAccessToken);
  const { isLogIn } = useAuth();
  const toast = useToast();

  const reservations = data?.reservations ?? [];
  const isShootCompletedListEmpty = reservations.length === 0;

  useEffect(() => {
    if (isLogIn === null) return;
    if (isLogIn === false) {
      toast.login('예약 기능은 로그인 후에 사용할 수 있어요.', undefined, 'bottom-[8.6rem]');
    }
  }, [isLogIn, toast]);

  if (isPending && isLogIn)
    return (
      <section className='px-[1rem] py-[1rem]'>
        <ProductCardSkeleton />
      </section>
    );

  if (isShootCompletedListEmpty || !isLogIn) {
    return (
      <EmptyView
        title='촬영 완료된 상품이 없어요'
        description='&#39;탐색&#39;에서 다양한 상품을 확인해 보세요'
      />
    );
  }

  return (
    <section className='flex flex-col gap-[1.6rem] p-[1.6rem]'>
      {reservations.map((reservation, reservationIndex) => {
        const product = reservation.product;
        return (
          <div key={reservation.reservationId}>
            <ReservationCard
              image={{ src: product?.imageUrl ?? '', alt: product?.title ?? '상품 이미지' }}
              name={product?.title ?? ''}
              rate={product?.rate ?? 0}
              reviewCount={product?.reviewCount ?? 0}
              photographer={product?.photographer ?? ''}
              price={product?.price ?? 0}
              moods={product?.moods ?? []}
              status={reservation.status as StateCode}
              date={reservation.createdAt ? formatCreatedAt(reservation.createdAt) : ''}
              reservationId={reservation.reservationId ?? 0}
              isReviewed={product?.isReviewed ?? false}
            />

            {reservationIndex !== reservations.length - 1 && (
              <Divider thickness='large' color='bg-black-3' className='-mx-[1.6rem] mt-[1.6rem]' />
            )}
          </div>
        );
      })}
    </section>
  );
}
