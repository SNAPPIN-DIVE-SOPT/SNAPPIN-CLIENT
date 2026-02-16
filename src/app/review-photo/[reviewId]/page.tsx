import PageClient from './page.client';
import NavigationClient from './components/navigation-client/Navigation.client';
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
    <div className='bg-black-10 relative flex min-h-dvh flex-col items-center'>
      <NavigationClient />
      <PageClient reviewId={reviewIdNumber} />
    </div>
  );
}
