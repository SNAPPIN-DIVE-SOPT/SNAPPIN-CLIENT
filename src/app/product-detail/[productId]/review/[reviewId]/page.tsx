import ClientPage from './page.client';

export default async function Page({ params }: { params: Promise<{ reviewId: string }> }) {
  const { reviewId } = await params;
  return <ClientPage reviewId={reviewId} />
}