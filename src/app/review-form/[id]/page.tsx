import { ProductInfoSection, ReviewFormSection } from './_section';
import { ClientHeader } from './components';
import { Divider } from '@/ui';

type ReviewFormPageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: ReviewFormPageProps) {
  const { id } = await params;

  return (
    <>
      <ClientHeader />
      <ProductInfoSection reservationId={id} />
      <Divider thickness='large' color='bg-black-3' />
      <ReviewFormSection reservationId={id} />
    </>
  );
}
