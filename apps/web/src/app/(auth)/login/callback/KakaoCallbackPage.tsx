'use client';

import { Loading } from '@/ui';
import useKakaoCallback from '@/app/(auth)/login/hooks/useKakaoCallback';

export default function KakaoCallbackPage() {
  useKakaoCallback();

  return (
    <div className='bg-black-10 flex h-dvh flex-col items-center justify-center gap-[1.5rem]'>
      <Loading />
      <p className='caption-14-md text-neon-black'>로그인 중...</p>
    </div>
  );
}
