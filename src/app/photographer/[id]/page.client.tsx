'use client';

import { Tabs } from '@/ui';
import { ROUTES } from '@/constants/routes/routes';
import {
  PhotographerSection,
  PhotographerSectionSkeleton,
  PortfolioListSection,
  ProductListSection,
} from './_section/index';
import { Header, Footer } from './components/index';
import { useGetPhotographerDetail } from './api/index';
import { PHOTOGRAPHER_TAB, PHOTOGRAPHER_TABS } from './constants/tab';

type ClientPageProps = {
  id: number;
  tab: string;
};

export default function ClientPage({ id, tab }: ClientPageProps) {
  const selectedTab = tab ?? PHOTOGRAPHER_TAB.PORTFOLIO;

  const { data, isPending } = useGetPhotographerDetail(id);

  return (
    <main className='flex flex-col'>
      <Header />
      {isPending ? (
        <PhotographerSectionSkeleton />
      ) : (
        <PhotographerSection
          name={data?.name ?? ''}
          imageUrl={data?.profileImageUrl ?? ''}
          bio={data?.bio ?? ''}
          specialties={data?.specialties ?? []}
          locations={data?.locations ?? []}
        />
      )}
      <Tabs>
        <Tabs.List activeValue={selectedTab} tabs={PHOTOGRAPHER_TABS} className='bg-black-1 fixed top-[17.6rem] z-10 w-full max-w-[45rem] px-[2rem]'>
          {PHOTOGRAPHER_TABS.map(({ value, label }) => (
            <Tabs.Item
              key={value}
              value={value}
              activeValue={selectedTab}
              href={ROUTES.PHOTOGRAPHER(id, { tab: value })}
            >
              {label}
            </Tabs.Item>
          ))}
        </Tabs.List>
        <div>
          {selectedTab === PHOTOGRAPHER_TAB.PORTFOLIO && (
            <div className='bg-black-1 mb-[7.6rem] p-[1rem]'>
              <PortfolioListSection id={id} />
            </div>
          )}
          {selectedTab === PHOTOGRAPHER_TAB.PRODUCT && (
            <div className='mb-[7.6rem]'>
              <ProductListSection id={id} />
            </div>
          )}
        </div>
      </Tabs>
      <Footer />
    </main>
  );
}