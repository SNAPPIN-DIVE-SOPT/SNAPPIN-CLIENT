import { ProductInfoSectionTemp, ReviewFormSectionTemp } from './_form';
import { ClientHeader } from './components';
import { Divider } from '@snappin/design-system';

type ReviewFormPageProps = { params: Promise<{ id: string }> };

export default async function Page({ params }: ReviewFormPageProps) {
  const { id } = await params;
  const productId = Number(id);
  if (Number.isNaN(productId)) throw new Error('Invalid product id');

  return (
    <>
      <ClientHeader />
      <ProductInfoSectionTemp productId={productId} />
      <Divider thickness='large' color='bg-black-3' />
      <ReviewFormSectionTemp productId={productId} />
    </>
  );
}
