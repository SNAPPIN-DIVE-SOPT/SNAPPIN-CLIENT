import { NavigationClient } from './components';
import { notFound } from 'next/navigation';
import PageClient from './page.client';

type PhotoFinalDetailPageProps = {
  params: Promise<{ id: string; reviewId: string }>;
};

export default async function Page({ params }: PhotoFinalDetailPageProps) {
  const { id, reviewId } = await params;
  const idNumber = Number(id);
  const reviewIdNumber = Number(reviewId);

  if (!idNumber || !reviewIdNumber) {
    return notFound();
  }

  return (
    <div className='bg-black-10 relative flex flex-col items-center justify-around'>
      <NavigationClient />
      <PageClient id={idNumber} reviewId={reviewIdNumber} />
    </div>
  );
}
