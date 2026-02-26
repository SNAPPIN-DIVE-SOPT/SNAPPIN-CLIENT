import PageClient from './page.client';
import NavigationClient from './components/navigation-client/Navigation.client';
import { notFound } from 'next/navigation';
import { getUserType } from '@/auth/userType';
import { USER_TYPE, UserType } from '@/auth/constant/userType';

type ReservationDetailPageProps = {
  params: Promise<{ id: string; reviewId: string }>;
};

export default async function Page({ params }: ReservationDetailPageProps) {
  const { reviewId } = await params;
  const reviewIdNumber = Number(reviewId);
  const userType = await getUserType();

  if (!reviewIdNumber) {
    return notFound();
  }

  return (
    <div className='bg-black-10 relative flex min-h-dvh flex-col items-center'>
      <NavigationClient />
      <PageClient reviewId={reviewIdNumber} userType={userType as UserType ?? USER_TYPE.CLIENT} />
    </div>
  );
}
