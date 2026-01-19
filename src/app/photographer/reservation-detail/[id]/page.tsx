import NavigationClient from './components/navigation-client/Navigation.client';
import PageClient from './page.client';
import { notFound } from 'next/navigation';

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
      <PageClient id={id} />
    </div>
  );
}
