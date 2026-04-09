export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { Suspense } from 'react';
import KakaoCallbackPage from './KakaoCallbackPage';
import Loading from '@/ui/loading/Loading';

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <KakaoCallbackPage />
    </Suspense>
  );
}
