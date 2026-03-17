import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { ROUTES } from '@/constants/routes/routes';
import { getQueryClient } from '@/utils/getQueryClient';
import {
  PhotographerSectionSkeleton,
  PhotographerSection,
  PortfolioListSection,
  ProductListSection
} from './_section/index';
import { Header, Footer } from './components/index';
import {
  prefetchPhotographerDetail,
  prefetchPortfolioList,
  prefetchProductList,
} from './api/server';
import { PHOTOGRAPHER_TAB, PHOTOGRAPHER_TABS } from '@/app/photographer/[id]/constants/tab';
import { PortfolioListSkeleton, ProductListSkeleton, Tabs } from '@snappin/design-system/ui';

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab: string | string[] | undefined }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { tab } = await searchParams;
  const photographerId = Number(id);
  const resolvedTab = Array.isArray(tab) ? tab[0] : tab;
  const selectedTab =
    resolvedTab === PHOTOGRAPHER_TAB.PORTFOLIO || resolvedTab === PHOTOGRAPHER_TAB.PRODUCT
      ? resolvedTab
      : PHOTOGRAPHER_TAB.PORTFOLIO;

  if (Number.isNaN(photographerId)) {
    return notFound();
  }

  const promises = [];
  const queryClient = getQueryClient();

  promises.push(prefetchPhotographerDetail(queryClient, photographerId));
  if (selectedTab === PHOTOGRAPHER_TAB.PORTFOLIO) {
    promises.push(prefetchPortfolioList(queryClient, photographerId));
  }
  if (selectedTab === PHOTOGRAPHER_TAB.PRODUCT) {
    promises.push(prefetchProductList(queryClient, photographerId));
  }
  Promise.all(promises);

  return (
    <main className='flex flex-col'>
      <Header />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<PhotographerSectionSkeleton />}>
          <PhotographerSection id={photographerId} />
        </Suspense>
        <Tabs>
          <Tabs.List activeValue={selectedTab} tabs={PHOTOGRAPHER_TABS} className='bg-black-1 fixed fixed-center top-[17.6rem] z-10 px-[2rem]'>
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
                <Suspense fallback={<PortfolioListSkeleton className='mt-[17.1rem]' />}>
                  <PortfolioListSection id={photographerId} />
                </Suspense>
              </div>
            )}
            {selectedTab === PHOTOGRAPHER_TAB.PRODUCT && (
              <div className='mb-[7.6rem]'>
                <Suspense fallback={<ProductListSkeleton className='mt-[17.1rem]' />}>
                  <ProductListSection id={photographerId} />
                </Suspense>
              </div>
            )}
          </div>
        </Tabs>
      </HydrationBoundary>
      <Footer />
    </main>
  );
}
