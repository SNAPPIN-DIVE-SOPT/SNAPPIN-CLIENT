import { readReturnToContext } from '@/auth/utils/returnTo';
import PageClient from './page.client';

type PageProps = {
  searchParams: Promise<{
    error?: string;
    returnTo?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { error, returnTo: rawReturnTo } = await searchParams;
  const returnTo = readReturnToContext(
    new URLSearchParams({
      returnTo: rawReturnTo ?? '',
    }),
  ).returnTo;

  return (
    <div className='bg-black-10 h-full'>
      <PageClient error={error} returnTo={returnTo} />
    </div>
  );
}
