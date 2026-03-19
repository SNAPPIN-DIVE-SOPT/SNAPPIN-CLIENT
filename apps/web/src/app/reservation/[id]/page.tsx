import PageClient from './page.client';
import { notFound } from 'next/navigation';

type ReservationDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: ReservationDetailPageProps) {
  const { id } = await params;
  const reservationIdNumber = Number(id);

  if (!reservationIdNumber) {
    return notFound();
  }

  return <PageClient reservationId={reservationIdNumber} />;
}
