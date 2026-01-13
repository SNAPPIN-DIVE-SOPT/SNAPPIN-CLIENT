export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { Suspense } from 'react';
import { Loading } from '@/ui';
import KakaoCallbackPage from './KakaoCallbackPage';

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <KakaoCallbackPage />
    </Suspense>
  );
}
