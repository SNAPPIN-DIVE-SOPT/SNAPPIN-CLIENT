'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

import { isValidUserType, USER_TYPE, UserType } from '@snappin/shared/types';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { setAuthUser } from '@/auth/userType';
import { setAccessToken } from '@/auth/token.client';
import { useKakaoLogin } from '@/auth/apis';
import { getReturnToParam, readReturnToContext, resolveReturnToPath } from '@/auth/utils/returnTo';
import { useToast, Loading } from '@/ui';
import { PHOTOGRAPHERS_ROUTES, ROUTES } from '@/constants/routes/routes';

const CLIENT_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URL;
const KAKAO_LOGIN_URL =
  `${SERVER_API_BASE_URL}/api/v2/auth/login/kakao` +
  `?redirect_uri=${encodeURIComponent(CLIENT_REDIRECT_URI!)}`;

export default function KakaoCallbackPage() {
  const params = useSearchParams();
  const toast = useToast();
  const toastRef = useRef(toast);
  toastRef.current = toast;

  const code = params.get('code');
  const error = params.get('error');
  const state = params.get('state');
  const returnToContext = readReturnToContext(new URLSearchParams(state ?? ''));

  const startedRef = useRef(false);

  const { mutateAsync } = useKakaoLogin(KAKAO_LOGIN_URL);

  const replaceLocation = (path: string) => {
    window.location.replace(path);
  };

  useEffect(() => {
    if (startedRef.current) return;

    if (error) {
      startedRef.current = true;
      replaceLocation(
        ROUTES.LOGIN({
          error: 'kakao',
          ...getReturnToParam(returnToContext),
        }),
      );
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

        await setAuthUser({
          role: data.data.role as UserType,
          hasPhotographerProfile: data.data.hasPhotographerProfile ?? false,
        });

        if (!data.data.isOnboardingCompleted) {
          replaceLocation(ROUTES.ON_BOARDING(1, getReturnToParam(returnToContext)));
          return;
        }

        if (returnToContext.returnTo) {
          replaceLocation(resolveReturnToPath(returnToContext, ROUTES.HOME));
          return;
        }

        const destination =
          data.data.role === USER_TYPE.PHOTOGRAPHER
            ? PHOTOGRAPHERS_ROUTES.RESERVATIONS()
            : ROUTES.HOME;

        replaceLocation(destination);
      } catch {
        replaceLocation(
          ROUTES.LOGIN({
            error: 'kakao',
            ...getReturnToParam(returnToContext),
          }),
        );
        toast.error(
          '카카오 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.',
          undefined,
          'top-[2rem]',
        );
      }
    })();
  }, [code, error, mutateAsync, returnToContext, toast]);

  return (
    <div className='bg-black-10 flex h-dvh flex-col items-center justify-center gap-[1.5rem]'>
      <Loading />
      <p className='caption-14-md text-neon-black'>로그인 중...</p>
    </div>
  );
}
