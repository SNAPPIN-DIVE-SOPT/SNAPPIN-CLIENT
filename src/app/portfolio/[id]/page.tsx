import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/utils/getQueryClient';
import {
  Header,
  PortfolioDetailContent,
  PortfolioDetailSkeleton
} from './components/index';
import { prefetchPortfolioDetail } from './api';

type PageProps = {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const portfolioId = Number(id);

  if (Number.isNaN(portfolioId)) {
    return notFound();
  }

  const cookieStore = await cookies();
  const isLogIn = cookieStore.has('AccessToken');
  const queryClient = getQueryClient();

  prefetchPortfolioDetail(queryClient, portfolioId, isLogIn);

  return (
    <main>
      <Header />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<PortfolioDetailSkeleton />}>
          <PortfolioDetailContent id={portfolioId} isLogIn={isLogIn} />
        </Suspense>
      </HydrationBoundary>
    </main>
  );
}