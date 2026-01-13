'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useKakaoLoginMutation } from '../api';
import { CreateKakaoLoginData } from '@/swagger-api/data-contracts';
import { setAccessToken } from '@/auth/token';
import { setUserType } from '@/auth/userType';
import { USER_TYPES } from '@/auth/constant/userType';
import { useToast } from '@/ui/toast/hooks/useToast';

export default function KakaoCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get('code');
  const error = params.get('error');
  const toast = useToast();
  const { mutate, isPending } = useKakaoLoginMutation()!;

  useEffect(() => {
    if (error) {
      console.error('error', error);
      router.replace('/login?error=kakao');
      return;
    }
    if (!code) return;

    mutate(
      { code },
      {
        onSuccess: (data: CreateKakaoLoginData) => {
          setAccessToken(data.data?.accessToken ?? '');
          setUserType(USER_TYPES[0]);
          router.replace('/');
        },
        onError: () => {
          router.replace('/login?error=kakao');
          toast.error(
            '카카오 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.',
            undefined,
            'top-[2rem]',
          );
        },
      },
    );
  }, [code, error, mutate, router]);

  return <h1>{isPending ? '로그인 중입니다…' : '처리 중…'}</h1>;
}
