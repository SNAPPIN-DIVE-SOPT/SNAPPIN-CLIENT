'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { setAuthUser } from '@/auth/userType';
import { setAccessToken } from '@/auth/token';
import { useKakaoLogin } from '@/auth/apis';

import { Loading } from '@snappin/design-system';
import { useToast } from '@/ui';
import { PHOTOGRAPHERS_ROUTES, ROUTES } from '@/constants/routes/routes';
import { isValidUserType, USER_TYPE, UserType } from '@snappin/shared/types';

const CLIENT_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URL;
const KAKAO_LOGIN_URL =
  `${SERVER_API_BASE_URL}/api/v1/auth/login/kakao` +
  `?redirect_uri=${encodeURIComponent(CLIENT_REDIRECT_URI!)}`;

export default function KakaoCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const toast = useToast();
  const toastRef = useRef(toast);
  toastRef.current = toast;

  const code = params.get('code');
  const error = params.get('error');

  const startedRef = useRef(false);

  const { mutateAsync } = useKakaoLogin(KAKAO_LOGIN_URL);

  useEffect(() => {
    if (startedRef.current) return;

    if (error) {
      startedRef.current = true;
      router.replace(ROUTES.LOGIN({ error: 'kakao' }));
      return;
    }

    if (!code) return;

    startedRef.current = true;

    (async () => {
      try {
        const data = await mutateAsync({ code });
        if (!data.data?.accessToken || !data.data?.role) {
          throw new Error('Invalid login response');
        }

        await setAccessToken(data.data.accessToken);

        if (!isValidUserType(data.data.role)) {
          throw new Error(`Invalid role: ${data.data.role}`);
        }
        // TODO: 서버 응답에 hasPhotographerProfile 있으면 그걸로 교체
        setAuthUser({
          role: data.data.role as UserType,
          hasPhotographerProfile: true,
        });

        if (data.data.isNew) {
          router.replace(ROUTES.AI_CURATION);
        } else if (data.data.role === USER_TYPE.PHOTOGRAPHER) {
          router.replace(PHOTOGRAPHERS_ROUTES.RESERVATIONS());
        } else {
          router.replace(ROUTES.HOME);
        }
      } catch {
        router.replace(ROUTES.LOGIN({ error: 'kakao' }));
        toast.error(
          '카카오 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.',
          undefined,
          'top-[2rem]',
        );
      }
    })();
  }, [code, error, mutateAsync, router, toast]);

  return (
    <div className='bg-black-10 flex h-dvh flex-col items-center justify-center gap-[1.5rem]'>
      <Loading />
      <p className='caption-14-md text-neon-black'>로그인 중...</p>
    </div>
  );
}
