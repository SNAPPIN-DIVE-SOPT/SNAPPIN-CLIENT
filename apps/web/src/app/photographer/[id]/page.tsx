import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Tabs } from '@snappin/design-system';
import { ROUTES } from '@/constants/routes/routes';
import { getQueryClient } from '@/utils/getQueryClient';
import { PortfolioListSkeleton, ProductListSkeleton } from '@/ui';
import { PHOTOGRAPHER_TAB, PHOTOGRAPHER_TABS } from '@/app/photographer/[id]/constants/tab';
import { Header, Footer, FooterSkeleton } from '@/app/photographer/[id]/components';
import {
  PhotographerSectionSkeleton,
  PhotographerSection,
  PortfolioListSection,
  ProductListSection,
} from '@/app/photographer/[id]/_section';
import {
  prefetchPhotographerDetail,
  prefetchPortfolioList,
  prefetchProductList,
} from '@/app/photographer/[id]/api/server';

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
  const cookieStore = await cookies();
  const isLogIn = cookieStore.has('AccessToken');

  promises.push(prefetchPhotographerDetail(queryClient, photographerId));
  if (selectedTab === PHOTOGRAPHER_TAB.PORTFOLIO) {
    promises.push(prefetchPortfolioList(queryClient, photographerId, isLogIn));
  }
  if (selectedTab === PHOTOGRAPHER_TAB.PRODUCT) {
    promises.push(prefetchProductList(queryClient, photographerId, isLogIn));
  }
  await Promise.all(promises);

  return (
    <main className='flex flex-col'>
      <Header />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<PhotographerSectionSkeleton />}>
          <PhotographerSection id={photographerId} />
        </Suspense>
        <Tabs>
          <Tabs.List
            activeValue={selectedTab}
            tabs={PHOTOGRAPHER_TABS}
            className='bg-black-1 fixed-center fixed top-[17.6rem] z-10 px-[2rem]'
          >
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
              <div className='bg-black-1 mb-[7.6rem]'>
                <Suspense fallback={<PortfolioListSkeleton className='mt-[17.1rem]' />}>
                  <PortfolioListSection id={photographerId} isLogIn={isLogIn} />
                </Suspense>
              </div>
            )}
            {selectedTab === PHOTOGRAPHER_TAB.PRODUCT && (
              <div className='mb-[7.6rem]'>
                <Suspense fallback={<ProductListSkeleton className='mt-[17.1rem]' />}>
                  <ProductListSection id={photographerId} isLogIn={isLogIn} />
                </Suspense>
              </div>
            )}
          </div>
        </Tabs>
        <Suspense fallback={<FooterSkeleton />}>
          <Footer id={photographerId} />
        </Suspense>
      </HydrationBoundary>
    </main>
  );
}
