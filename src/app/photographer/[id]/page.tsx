import ClientPage from './page.client';

type PageProps = {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const photographerId = Number(id);
  return <ClientPage id={photographerId} />;
}