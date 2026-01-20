import PageClient from '@/app/(with-layout)/like/page.client';
import { Suspense } from 'react';

export default function Like() {
  return (
    <Suspense fallback={null}>
      <PageClient />
    </Suspense>
  );
}
