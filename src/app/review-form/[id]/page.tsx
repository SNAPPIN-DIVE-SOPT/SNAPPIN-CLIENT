import { ProductInfoSection, ReviewFormSection } from './_section';
import { ClientHeader } from './components';
import { Divider } from '@/ui';

type ReviewFormPageProps = {
  params: { id: string };
};

export default function Page({ params }: ReviewFormPageProps) {
  const { id } = params;

  return (
    <>
      <ClientHeader />
      <ProductInfoSection reservationId={id} />
      <Divider thickness='large' color='bg-black-3' />
      <ReviewFormSection reservationId={id} />
    </>
  );
}
