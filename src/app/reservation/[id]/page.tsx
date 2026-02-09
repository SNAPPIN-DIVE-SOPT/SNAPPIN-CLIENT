import PageClient from './page.client';

type ReservationDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: ReservationDetailPageProps) {
  const { id } = await params;
  return <PageClient reservationId={id} />;
}
