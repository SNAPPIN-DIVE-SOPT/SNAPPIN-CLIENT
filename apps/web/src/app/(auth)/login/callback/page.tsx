export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { Suspense } from 'react';
import Lottie from 'lottie-react';
import { loadingAnimation } from '@snappin/design-system/lotties';
import KakaoCallbackPage from './KakaoCallbackPage';

export default function Page() {
  return (
    <Suspense fallback={<Lottie animationData={loadingAnimation} className='h-[7rem] w-[7rem]' />}>
      <KakaoCallbackPage />
    </Suspense>
  );
}
