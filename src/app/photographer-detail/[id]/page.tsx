import PageClient from './page.client';

export default async function PhotographerDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PageClient photographerId={id} />;
}