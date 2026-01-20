import PageClient from './page.client';
import { NavigationClient } from './components';
import { notFound } from 'next/navigation';

type ReservationDetailPageProps = {
  params: Promise<{ id: string; reviewId: string }>;
};

export default async function Page({ params }: ReservationDetailPageProps) {
  const { reviewId } = await params;
  const reviewIdNumber = Number(reviewId);

  if (!reviewIdNumber) {
    return notFound();
  }

  return (
    <div className='bg-black-10 flex h-dvh flex-col'>
      <NavigationClient />
      <PageClient reviewId={reviewIdNumber} />
    </div>
  );
}
