'use client';

import SectionTabsNew from '@/ui/section-tabs-new/SectionTabsNew';
import { useTabQuerySync } from '@/hooks/useTabQuerySync';
import { ReservationListSection, ShootCompletedListSection } from './_section';
import { ClientNavigation } from './components';
import { RESERVATION_TAB, RESERVATION_TAB_MAP, type ReservationTab } from './constants/tabs';

const RESERVATION_TABS = [
  { label: RESERVATION_TAB_MAP.CLIENT_OVERVIEW, value: RESERVATION_TAB.CLIENT_OVERVIEW },
  { label: RESERVATION_TAB_MAP.CLIENT_DONE, value: RESERVATION_TAB.CLIENT_DONE },
];

export default function PageClient() {
  const { activeValue, handleChange } = useTabQuerySync('tab', RESERVATION_TAB.CLIENT_OVERVIEW);
  const activeTabValue = activeValue as ReservationTab;

  return (
    <div className='bg-black-1 flex min-h-full flex-col'>
      <header className='sticky top-0 z-100'>
        <ClientNavigation />
        <SectionTabsNew
          tabs={RESERVATION_TABS}
          activeValue={activeTabValue}
          onChange={handleChange}
        />
      </header>

      {activeTabValue === RESERVATION_TAB.CLIENT_OVERVIEW ? (
        <ReservationListSection />
      ) : (
        <ShootCompletedListSection />
      )}
    </div>
  );
}
