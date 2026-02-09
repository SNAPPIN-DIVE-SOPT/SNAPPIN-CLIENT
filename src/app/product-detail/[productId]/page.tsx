import ClientPage from './page.client';

export default async function Page({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  return <ClientPage productId={productId} />;
}
