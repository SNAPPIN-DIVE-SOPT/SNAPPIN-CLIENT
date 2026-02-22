import { Suspense } from 'react';
import { cookies } from 'next/headers';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
  defaultShouldDehydrateQuery
} from '@tanstack/react-query';
import {
  Header,
  PortfolioDetailContent,
  PortfolioDetailSkeleton
} from './components/index';
import { prefetchPortfolioDetail } from './api';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const cookieStore = await cookies();
  const isLogIn = cookieStore.has('AccessToken');
  
  const queryClient = new QueryClient({
    defaultOptions: {
      dehydrate: {
        shouldDehydrateQuery: (query) => 
          query.state.status === 'pending' ||
          defaultShouldDehydrateQuery(query),
      },
    },
  });
  if (!Number.isNaN(Number(id))) {
    prefetchPortfolioDetail(queryClient, Number(id), isLogIn);
  }

  return (
    <main>
      <Header />
      <Suspense fallback={<PortfolioDetailSkeleton />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <PortfolioDetailContent id={Number(id)} isLogIn={isLogIn} />
        </HydrationBoundary>
      </Suspense>
    </main>
  );
}