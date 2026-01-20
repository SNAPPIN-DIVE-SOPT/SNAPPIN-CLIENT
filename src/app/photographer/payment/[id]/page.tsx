import PageClient from './page.client';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className='bg-black-3 flex min-h-dvh flex-col'>
      <PageClient id={Number(id)} />
    </div>
  );
}
