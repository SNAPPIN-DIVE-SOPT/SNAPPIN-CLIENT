'use client';

import { SectionTabs } from '@/ui';
import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReservationListSection, ShootCompletedListSection } from './_section';
import { ClientNavigation, EmptyView } from './components';
import { RESERVATION_TAB, RESERVATION_TAB_MAP, type ReservationTab } from './constants/tabs';
import { RESERVATION_MOCK } from './mock';
import { useToast } from '@/ui/toast/hooks/useToast';

export default function PageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { login } = useToast();

  // TODO: API 연동 시 useAuth()로 교체
  const isLoggedIn = false;

  useEffect(
    () =>
      isLoggedIn
        ? undefined
        : login('예약 기능은 로그인 후에 사용할 수 있어요.', undefined, 'bottom-[9.2rem]'),
    [isLoggedIn, login],
  );

  const selectedTabValue = (searchParams.get('tab') ??
    RESERVATION_TAB.CLIENT_OVERVIEW) as ReservationTab;

  const handleTabChange = (value: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set('tab', value);
    router.push(`${pathname}?${updatedSearchParams.toString()}`);
  };

  const reservations = RESERVATION_MOCK.reservations;

  return !isLoggedIn ? (
    <div className='bg-black-1 flex min-h-full flex-col'>
      <ClientNavigation />
      <EmptyView title='예약 문의한 상품이 없어요' description='원하는 상품을 예약해보세요.' />
    </div>
  ) : (
    <div className='bg-black-1 flex min-h-full flex-col'>
      <ClientNavigation />
      <SectionTabs value={selectedTabValue} handleValueChange={handleTabChange}>
        <SectionTabs.List className='bg-black-1 fixed-center fixed z-15'>
          {/* 예약 현황 */}
          <SectionTabs.Tab value={RESERVATION_TAB.CLIENT_OVERVIEW}>
            {RESERVATION_TAB_MAP.CLIENT_OVERVIEW}
          </SectionTabs.Tab>

          {/* 촬영 완료 */}
          <SectionTabs.Tab value={RESERVATION_TAB.CLIENT_DONE}>
            {RESERVATION_TAB_MAP.CLIENT_DONE}
          </SectionTabs.Tab>
        </SectionTabs.List>

        <SectionTabs.Contents value={RESERVATION_TAB.CLIENT_OVERVIEW} className='mt-[4.5rem]'>
          <ReservationListSection reservations={reservations} />
        </SectionTabs.Contents>

        <SectionTabs.Contents value={RESERVATION_TAB.CLIENT_DONE} className='mt-[4.5rem]'>
          <ShootCompletedListSection reservations={reservations} />
        </SectionTabs.Contents>
      </SectionTabs>
    </div>
  );
}
