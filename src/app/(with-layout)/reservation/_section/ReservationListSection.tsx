'use client';

import { useEffect } from 'react';
import { Divider, ProductListSkeleton } from '@/ui';
import { EmptyView, ReservationCard } from '../components';
import { useToast } from '@/ui/toast/hooks/useToast';
import { StateCode } from '@/types/stateCode';
import { formatCreatedAt } from '@/utils/formatNumberWithComma';
import { useGetReservationList } from '../api';
import { RESERVATION_TAB } from '../constants/tabs';
import { useAuth } from '@/auth/hooks/useAuth';

export default function ReservationListSection() {
  const toast = useToast();
  // 로그인 여부
  const { isLogIn } = useAuth();

  useEffect(() => {
    if (isLogIn === false) {
      toast.login('예약 기능은 로그인 후에 사용할 수 있어요.', undefined, 'bottom-[8.6rem]');
    }
  }, [isLogIn, toast]);

  const { data, isFetching } = useGetReservationList(RESERVATION_TAB.CLIENT_OVERVIEW);

  const reservations = data?.reservations ?? [];
  const hasData = (data?.reservations?.length ?? 0) > 0;

  if (isFetching && !hasData) {
    return <ProductListSkeleton />;
  }

  if (!hasData || isLogIn === false) {
    return (
      <EmptyView
        title='예약 문의한 상품이 없어요'
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
