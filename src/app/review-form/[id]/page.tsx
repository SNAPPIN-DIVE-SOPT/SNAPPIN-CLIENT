import { ProductInfoSection, ReviewFormSection } from './_section';
import { ClientHeader } from './components';
import { Divider } from '@/ui';

type ReviewFormPageProps = { params: Promise<{ id: string }> };

export default async function Page({ params }: ReviewFormPageProps) {
  const { id } = await params;
  const reservationId = Number(id);
  if (Number.isNaN(reservationId)) throw new Error('Invalid reservation id');

  return (
    <>
      <ClientHeader />
      <ProductInfoSection reservationId={reservationId} />
      <Divider thickness='large' color='bg-black-3' />
      <ReviewFormSection reservationId={reservationId} />
    </>
  );
}
