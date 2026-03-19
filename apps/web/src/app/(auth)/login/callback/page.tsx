export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { Suspense } from 'react';
import { Loading } from '@snappin/design-system';
import KakaoCallbackPage from './KakaoCallbackPage';

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <KakaoCallbackPage />
    </Suspense>
  );
}
