'use client';

import { useEffect, useRef, useMemo, useState } from 'react';
import { Divider, ProductListSkeleton } from '@/ui';
import { EmptyView, ReservationCard } from '../components';
import { StateCode } from '@/types/stateCode';
import { useToast } from '@/ui/toast/hooks/useToast';
import { useGetReservationList } from '../api';
import { RESERVATION_TAB } from '../constants/tabs';
import { useAuth } from '@/auth/hooks/useAuth';
import { formatCreatedAt } from '@/utils/formatNumberWithComma';
import { useScrollRestoreOnParent } from '@/hooks/useScrollRestoreOnParent';

export default function ShootCompletedListSection() {
  /** 로그인 여부 */
  const { isLogIn } = useAuth();
  const { login } = useToast();

  /** 데이터 조회 */
  const { data, isFetching } = useGetReservationList(RESERVATION_TAB.CLIENT_DONE, isLogIn === true);

  const reservations = data?.reservations ?? [];

  const [hasEverHadData, setHasEverHadData] = useState(false);

  useEffect(() => {
    if (reservations.length > 0) {
      setHasEverHadData(true);
    }
  }, [reservations.length]);

  /** 로그인 X 토스트 */
  useEffect(() => {
    if (isLogIn === false) {
      login('예약 기능은 로그인 후에 사용할 수 있어요.', undefined, 'bottom-[8.6rem]');
    }
  }, [isLogIn, login]);

  /** 스크롤 복원 */
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const scrollKey = useMemo(
    () => `reservation:list:${RESERVATION_TAB.CLIENT_DONE}:${isLogIn ?? 'unknown'}`,
    [isLogIn],
  );

  useScrollRestoreOnParent(anchorRef, scrollKey, [reservations.length], {
    enabled: isLogIn === true,
  });

  if (isLogIn == null) return null;

  /** 로그인 X */
  if (isLogIn === false) {
    return (
      <EmptyView
        title='촬영 완료된 상품이 없어요'
        description='‘탐색’에서 다양한 포트폴리오를 확인해보세요'
      />
    );
  }

  /** 로그인 O & 데이터 한 번도 없음 */
  if (!hasEverHadData && !isFetching) {
    return (
      <EmptyView
        title='촬영 완료된 상품이 없어요'
        description='‘탐색’에서 다양한 포트폴리오를 확인해보세요'
      />
    );
  }

  return (
    <section className='flex flex-col gap-[1.6rem] p-[1.6rem]' ref={anchorRef}>
      {isFetching && hasEverHadData && <ProductListSkeleton />}

      {reservations.map((reservation, index) => {
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

            {index !== reservations.length - 1 && (
              <Divider thickness='large' color='bg-black-3' className='-mx-[1.6rem] mt-[1.6rem]' />
            )}
          </div>
        );
      })}
    </section>
  );
}
