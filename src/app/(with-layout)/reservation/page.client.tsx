'use client';

import { SectionTabs } from '@/ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReservationListSection, ShootCompletedListSection } from './_section';
import { ClientNavigation } from './components';
import { RESERVATION_TAB, RESERVATION_TAB_MAP, type ReservationTab } from './constants/tabs';
import { RESERVATION_MOCK } from './mock';

export default function PageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedTabValue = (searchParams.get('tab') ??
    RESERVATION_TAB.CLIENT_OVERVIEW) as ReservationTab;

  const handleTabChange = (value: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set('tab', value);
    router.push(`${pathname}?${updatedSearchParams.toString()}`);
  };

  const reservations = RESERVATION_MOCK.reservations;

  return (
    <div className='bg-black-1 flex min-h-full flex-col'>
      <ClientNavigation />
      <SectionTabs value={selectedTabValue} handleValueChange={handleTabChange}>
        <SectionTabs.List className='bg-black-1 fixed z-15'>
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
