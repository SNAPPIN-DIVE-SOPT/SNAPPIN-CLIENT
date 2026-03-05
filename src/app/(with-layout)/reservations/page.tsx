import { Tabs } from '@/ui';
import { ROUTES } from '@/constants/routes/routes';
import { ClientNavigation } from './components';
import { ReservationListSection, ShootCompletedListSection } from './_section';
import { RESERVATION_TAB, RESERVATION_TAB_ITEMS, type ReservationTab } from './constants/tabs';

type ReservationsPageProps = {
  searchParams: Promise<{ tab?: string }>;
};

const createTabHref = (tabValue: ReservationTab) => `${ROUTES.RESERVATIONS}?tab=${tabValue}`;

const hasReservationTab = (value?: string): value is ReservationTab =>
  Object.values(RESERVATION_TAB).some((tabValue) => tabValue === value);

export default async function Page({ searchParams }: ReservationsPageProps) {
  const currentSearchParams = await searchParams;
  const selectedTabValue = hasReservationTab(currentSearchParams.tab)
    ? currentSearchParams.tab
    : RESERVATION_TAB.CLIENT_OVERVIEW;

  return (
    <div className='bg-black-1 flex min-h-full flex-col'>
      <ClientNavigation />

      <Tabs>
        <Tabs.List
          activeValue={selectedTabValue}
          tabs={RESERVATION_TAB_ITEMS}
          className='bg-black-1 fixed-center fixed z-15'
        >
          {RESERVATION_TAB_ITEMS.map(({ value, label }) => (
            <Tabs.Item
              key={value}
              value={value}
              activeValue={selectedTabValue}
              href={createTabHref(value)}
            >
              {label}
            </Tabs.Item>
          ))}
        </Tabs.List>
      </Tabs>

      <div className='mt-[4.5rem]'>
        {selectedTabValue === RESERVATION_TAB.CLIENT_OVERVIEW && <ReservationListSection />}
        {selectedTabValue === RESERVATION_TAB.CLIENT_DONE && <ShootCompletedListSection />}
      </div>
    </div>
  );
}
