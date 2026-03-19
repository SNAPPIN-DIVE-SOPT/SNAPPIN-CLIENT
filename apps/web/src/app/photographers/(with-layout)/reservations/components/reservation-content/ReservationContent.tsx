'use client';

import { useSearchParams } from 'next/navigation';
import { Divider, Tabs } from '@snappin/design-system';
import { RESERVATION_TABS, TAB, getSelectedTab } from '../../constants/tabs';
import { ReservationCard, ReservationCardSkeleton, EmptyView } from '../index';
import { useGetReservationList } from '../../api';
import { PHOTOGRAPHERS_ROUTES } from '@/constants/routes/routes';
import { StateCode } from '@snappin/shared/types';

const getEmptyText = (tab: string): string => {
  if (tab === TAB.PHOTOGRAPHER_REQUESTED) {
    return '예약 요청된 상품이 없어요';
  }
  if (tab === TAB.PHOTOGRAPHER_ADJUSTING) {
    return '조율 중인 상품이 없어요';
  }
  if (tab === TAB.PHOTOGRAPHER_CONFIRMED) {
    return '예약 확정된 상품이 없어요';
  }
  if (tab === TAB.PHOTOGRAPHER_DONE) {
    return '촬영 완료된 상품이 없어요';
  }
  return '';
};

export default function ReservationContent() {
  const searchParams = useSearchParams();
  const selectedTab = getSelectedTab(searchParams.get('tab'));

  const { data, isPending } = useGetReservationList(selectedTab);

  return (
    <div className='flex flex-col'>
      <Tabs>
        <Tabs.List activeValue={selectedTab} tabs={RESERVATION_TABS}>
          {RESERVATION_TABS.map(({ value, label }) => (
            <Tabs.Item
              key={value}
              value={value}
              activeValue={selectedTab}
              href={PHOTOGRAPHERS_ROUTES.RESERVATIONS({ tab: value })}
            >
              {label}
            </Tabs.Item>
          ))}
        </Tabs.List>
        {isPending ? (
          <ReservationCardSkeleton />
        ) : data?.reservations?.length === 0 ? (
          <EmptyView
            title={getEmptyText(selectedTab)}
            description='새로운 예약이 생성되면 바로 알려드릴게요'
          />
        ) : (
          <div className='flex flex-col'>
            {data?.reservations?.map((item, index) => {
              const { product } = item;
              return (
                <div key={item.reservationId}>
                  <ReservationCard
                    preload={index <= 4}
                    reservationId={item.reservationId ?? 0}
                    status={(item.status as StateCode) ?? ''}
                    image={{ src: product?.imageUrl ?? '', alt: product?.title ?? '' }}
                    name={product?.title ?? ''}
                    rate={product?.rate ?? 0}
                    reviewCount={product?.reviewCount ?? 0}
                    client={item.client ?? ''}
                    price={product?.price ?? 0}
                    photographer={product?.photographer ?? ''}
                    moods={product?.moods ?? []}
                    date={item.createdAt ?? ''}
                  />
                  {index !== (data?.reservations?.length ?? 0) - 1 && (
                    <Divider thickness='large' color='bg-black-3' />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Tabs>
    </div>
  );
}
