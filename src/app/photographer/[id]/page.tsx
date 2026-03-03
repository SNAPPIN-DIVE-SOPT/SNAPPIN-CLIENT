import ClientPage from './page.client';

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab: string }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { tab } = await searchParams;
  const photographerId = Number(id);
  return <ClientPage id={photographerId} tab={tab} />;
}