import { notFound } from 'next/navigation';
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import SectionSkeleton from '../../../../components/layout/reservation/SectionSkeleton';
import NavigationClient from './components/navigation-client/Navigation.client';
import PageClient from './page.client';
import { prefetchReservationDetail } from './api';
import { Suspense } from 'react';

type ReservationDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: ReservationDetailPageProps) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  return (
    <div className='bg-black-3 flex flex-col'>
      <NavigationClient />
      <Suspense fallback={<SectionSkeleton />}>
        <SuspensePage id={id} />
      </Suspense>
    </div>
  );
}

const SuspensePage = async ({ id }: { id: string }) => {
  const queryClient = new QueryClient();

  await prefetchReservationDetail(queryClient, Number(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageClient id={id} />
    </HydrationBoundary>
  );
};
