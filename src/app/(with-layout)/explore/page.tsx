'use client';

import PageClient from '@/app/(with-layout)/explore/page.client';
import { Suspense } from 'react';

export default function Explore() {
  return (
    <Suspense fallback={null}>
      <PageClient />
    </Suspense>
  );
}
