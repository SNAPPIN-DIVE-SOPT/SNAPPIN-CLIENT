'use client';

import PageClient from '@/app/(with-layout)/explore/page.client';
import { Suspense } from 'react';
import { Loading } from '@/ui';

export default function Explore() {
  return (
    <Suspense fallback={<Loading className='h-full w-full self-center' />}>
      <PageClient />
    </Suspense>
  );
}
