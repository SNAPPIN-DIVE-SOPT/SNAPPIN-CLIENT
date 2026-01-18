import { Suspense } from 'react';
import PageClient from './page.client';

export default function Page() {
  return (
    /* 빌드 에러 해결을 위한 Suspense 임시 fallback */
    <Suspense fallback={null}>
      <PageClient />
    </Suspense>
  );
}
