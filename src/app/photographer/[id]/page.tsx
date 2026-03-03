import { Suspense } from 'react';
import { ROUTES } from '@/constants/routes/routes';
import { Tabs, PortfolioListSkeleton, ProductListSkeleton } from '@/ui';
import {
  PhotographerSection,
  PortfolioListSection,
  ProductListSection,
} from './_section/index';
import { Header, Footer } from './components/index';
import { PHOTOGRAPHER_TAB, PHOTOGRAPHER_TABS } from './constants/tab';
import { PhotographerSectionSkeleton } from './_section/index';

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab: string }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { tab } = await searchParams;
  const photographerId = Number(id);
  const selectedTab = tab ?? PHOTOGRAPHER_TAB.PORTFOLIO;

  return (
    <main className='flex flex-col'>
      <Header />
      <Suspense fallback={<PhotographerSectionSkeleton />}>
        <PhotographerSection id={photographerId} />
      </Suspense>
      <Tabs>
        <Tabs.List activeValue={selectedTab} tabs={PHOTOGRAPHER_TABS} className='bg-black-1 fixed top-[17.6rem] z-10 w-full max-w-[45rem] px-[2rem]'>
          {PHOTOGRAPHER_TABS.map(({ value, label }) => (
            <Tabs.Item
              key={value}
              value={value}
              activeValue={selectedTab}
              href={ROUTES.PHOTOGRAPHER(photographerId, { tab: value })}
            >
              {label}
            </Tabs.Item>
          ))}
        </Tabs.List>
        <div>
          {selectedTab === PHOTOGRAPHER_TAB.PORTFOLIO && (
            <div className='bg-black-1 mb-[7.6rem] p-[1rem]'>
              <Suspense fallback={
                <div className='mt-[17.1rem]'>
                  <PortfolioListSkeleton />
                </div>
              }>
                <PortfolioListSection id={photographerId} />
              </Suspense>
            </div>
          )}
          {selectedTab === PHOTOGRAPHER_TAB.PRODUCT && (
            <div className='mb-[7.6rem]'>
              <Suspense fallback={
                <div className='mt-[17.1rem]'>
                  <ProductListSkeleton />
                </div>
              }>
                <ProductListSection id={photographerId} />
              </Suspense>
            </div>
          )}
        </div>
      </Tabs>
      <Footer />
    </main>
  );
}