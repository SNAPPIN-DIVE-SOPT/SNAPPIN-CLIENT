'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { CreateKakaoLoginData } from '@/swagger-api/data-contracts';
import { USER_TYPE, UserType } from '@/auth/constant/userType';
import { setUserType } from '@/auth/userType';
import { setAccessToken } from '@/auth/token';
import { useToast } from '@/ui/toast/hooks/useToast';

type KakaoCodePayload = { code: string };

export const useKakaoLoginMutation = () => {
  const router = useRouter();
  const toast = useToast();
  const CLIENT_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URL;
  const URL =
    `${SERVER_API_BASE_URL}/api/v1/auth/login/kakao` +
    `?redirect_uri=${encodeURIComponent(CLIENT_REDIRECT_URI!)}`;

  return useMutation<CreateKakaoLoginData, Error, KakaoCodePayload>({
    mutationFn: async ({ code }) => {
      const res = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Kakao login failed: ${res.status} ${text}`);
      }

      return res.json();
    },

    onSuccess: (data) => {
      setAccessToken(data.data?.accessToken ?? '');
      setUserType(data.data?.role as UserType);
      if(data.data?.isNew){
        router.replace('/ai-curation');
      }else if(data.data?.role === USER_TYPE.PHOTOGRAPHER){
        router.replace('/photographer/reservation');
      }else{
        router.replace('/');
      }
    },

    onError: () => {
      router.replace('/login?error=kakao');
      toast.error(
        '카카오 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.',
        undefined,
        'top-[2rem]',
      );
    },
  });
};
