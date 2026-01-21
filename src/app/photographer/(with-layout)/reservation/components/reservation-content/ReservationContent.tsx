'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { StateCode } from '@/types/stateCode';
import { Divider, SectionTabs } from '@/ui';
import { RESERVATION_TAB, RESERVATION_TAB_MAP, ReservationTab } from '../../constants/tabs';
import ReservationCard from '../reservation-card/ReservationCard';
import EmtpyView from '../emtpy-view/EmtpyView';
import { useGetReservationList } from '../../api';
import ReservationCardSkeleton from '../reservation-card/ReservationCardSkeleton';

const isReservationTab = (value: string | null) => {
  return value === RESERVATION_TAB.PHOTOGRAPHER_REQUESTED || value === RESERVATION_TAB.PHOTOGRAPHER_ADJUSTING || value === RESERVATION_TAB.PHOTOGRAPHER_CONFIRMED || value === RESERVATION_TAB.PHOTOGRAPHER_DONE;
};

export default function ReservationContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedTab = isReservationTab(searchParams.get('tab')) ? searchParams.get('tab') as ReservationTab : RESERVATION_TAB.PHOTOGRAPHER_REQUESTED;
  
  const { data,isPending } = useGetReservationList(selectedTab);
  
  const handleTabChange = (value: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set('tab', value);
    router.push(`${pathname}?${updatedSearchParams.toString()}`);
  };

  return (
    <div className='flex flex-col'>
      <SectionTabs  
        value={selectedTab}
        handleValueChange={handleTabChange}
      >
        <SectionTabs.List>
          <SectionTabs.Tab value={RESERVATION_TAB.PHOTOGRAPHER_REQUESTED}>
            {RESERVATION_TAB_MAP.PHOTOGRAPHER_REQUESTED}
          </SectionTabs.Tab>
          <SectionTabs.Tab value={RESERVATION_TAB.PHOTOGRAPHER_ADJUSTING}>
            {RESERVATION_TAB_MAP.PHOTOGRAPHER_ADJUSTING}
          </SectionTabs.Tab>
          <SectionTabs.Tab value={RESERVATION_TAB.PHOTOGRAPHER_CONFIRMED}>
            {RESERVATION_TAB_MAP.PHOTOGRAPHER_CONFIRMED}
          </SectionTabs.Tab>
          <SectionTabs.Tab value={RESERVATION_TAB.PHOTOGRAPHER_DONE}>
            {RESERVATION_TAB_MAP.PHOTOGRAPHER_DONE}
          </SectionTabs.Tab>
        </SectionTabs.List>

        <SectionTabs.Contents value={selectedTab}>
          {isPending ? (
            <ReservationCardSkeleton />
          ) : data?.reservations?.length === 0 ? (
            <EmtpyView
              title='상품이 없어요'
              description='‘예약’에서 다양한 예약을 확인해보세요'
            />
          ) : (
            <div className='flex flex-col'>
              {data?.reservations?.map((item, index) => {
                const { product } = item;
                return (
                  <div key={index}>
                    <ReservationCard
                      reservationId={item.reservationId ?? 0}
                      status={item.status as StateCode ?? ''}
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
        </SectionTabs.Contents>
      </SectionTabs>
    </div>
  );
}
