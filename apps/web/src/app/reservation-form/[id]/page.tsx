import { ReservationFormSection } from './_form';
import { ClientHeader } from './components';

type ReservationFormPageProps = { params: Promise<{ id: string }> };

export default async function Page({ params }: ReservationFormPageProps) {
  const { id } = await params;
  const photographerId = Number(id);
  if (Number.isNaN(photographerId)) throw new Error('Invalid photographer id');

  return (
    <>
      <ClientHeader />
      <ReservationFormSection photographerId={photographerId} />
    </>
  );
}
