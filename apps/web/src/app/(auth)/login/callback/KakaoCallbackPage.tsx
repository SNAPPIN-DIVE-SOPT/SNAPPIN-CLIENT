'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

import { isValidUserType, USER_TYPE } from '@snappin/shared/types';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { setAuthUser } from '@/auth/userType';
import { setAccessToken } from '@/auth/token.client';
import { useKakaoLogin } from '@/auth/apis';
import { getReturnToParam, readReturnToContext, resolveReturnToPath } from '@/auth/utils/returnTo';
import { Loading } from '@/ui';
import { PHOTOGRAPHERS_ROUTES, ROUTES } from '@/constants/routes/routes';

const CLIENT_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URL;

const KAKAO_LOGIN_URL =
  `${SERVER_API_BASE_URL}/api/v2/auth/login/kakao` +
  `?redirect_uri=${encodeURIComponent(CLIENT_REDIRECT_URI!)}`;

export default function KakaoCallbackPage() {
  const params = useSearchParams();

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
        const loginData = data.data;

        if (!loginData?.accessToken || !loginData?.role) {
          throw new Error('Invalid login response');
        }

        const role = loginData.role;
        if (!isValidUserType(role)) {
          throw new Error(`Invalid role: ${role}`);
        }

        await setAccessToken(loginData.accessToken);

        await setAuthUser({
          role,
          hasPhotographerProfile: loginData.hasPhotographerProfile ?? false,
        });
        // 온보딩 미완료 시 온보딩 페이지로 이동
        if (!loginData.isOnboardingCompleted) {
          replaceLocation(ROUTES.ON_BOARDING(1, getReturnToParam(returnToContext)));
          return;
        }
        // returnTo가 있으면 returnTo로 이동
        if (returnToContext.returnTo) {
          replaceLocation(resolveReturnToPath(returnToContext, ROUTES.HOME));
          return;
        }
        // 포토그래퍼는 예약 페이지로, 일반 유저는 홈으로 이동
        const destination =
          role === USER_TYPE.PHOTOGRAPHER ? PHOTOGRAPHERS_ROUTES.RESERVATIONS() : ROUTES.HOME;

        replaceLocation(destination);
      } catch {
        replaceLocation(
          ROUTES.LOGIN({
            error: 'kakao',
            ...getReturnToParam(returnToContext),
          }),
        );
      }
    })();
  }, [code, error, mutateAsync, returnToContext]);

  return (
    <div className='bg-black-10 flex h-dvh flex-col items-center justify-center gap-[1.5rem]'>
      <Loading />
      <p className='caption-14-md text-neon-black'>로그인 중...</p>
    </div>
  );
}
