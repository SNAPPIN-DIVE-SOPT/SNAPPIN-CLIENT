import PageClient from '@/app/(with-layout)/explore/page.client';
import { Suspense } from 'react';

export default function Explore() {
  return (
    /* 빌드 에러 해결용 Suspense 임시 fallback */
    <Suspense fallback={<span>임시 loading</span>}>
      <PageClient />
    </Suspense>
  );
}
