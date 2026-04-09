import { notFound } from 'next/navigation';
import { getUserType } from '@/auth/userType';
import NavigationClient from './components/navigation-client/Navigation.client';
import PageClient from './page.client';
import { USER_TYPE } from '@snappin/shared/types';

type ReservationDetailPageProps = {
  params: Promise<{ id: string; reviewId: string }>;
};

export default async function Page({ params }: ReservationDetailPageProps) {
  const { reviewId } = await params;
  const reviewIdNumber = Number(reviewId);
  const rawUserType = await getUserType();
  const userType =
    rawUserType === USER_TYPE.PHOTOGRAPHER ? USER_TYPE.PHOTOGRAPHER : USER_TYPE.CLIENT;

  if (!reviewIdNumber) {
    return notFound();
  }

  return (
    <div className='bg-black-10 relative flex min-h-dvh flex-col items-center'>
      <NavigationClient />
      <PageClient reviewId={reviewIdNumber} userType={userType} />
    </div>
  );
}
