import PageClient from './page.client';
import { getPaymentBasePrice } from './api/server';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const reservationId = Number(id);
  const basePrice = await getPaymentBasePrice(reservationId);

  return (
    <div className='bg-black-1 flex min-h-dvh flex-col'>
      <PageClient id={reservationId} basePrice={basePrice} />
    </div>
  );
}
