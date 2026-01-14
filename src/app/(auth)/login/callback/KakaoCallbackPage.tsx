'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useKakaoLoginMutation } from '../api';
import { Loading } from '@/ui';

export default function KakaoCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get('code');
  const error = params.get('error');

  const { mutate } = useKakaoLoginMutation()!;

  useEffect(() => {
    if (error) {
      router.replace('/login?error=kakao');
      return;
    }
    if (!code) return;

    mutate({ code });
  }, [code, error, mutate, router]);

  return (
    <div className='bg-black-10 flex h-dvh flex-col items-center justify-center gap-[1.5rem]'>
      <Loading />
      <p className='caption-14-md text-neon-black'>로그인 중...</p>
    </div>
  );
}
