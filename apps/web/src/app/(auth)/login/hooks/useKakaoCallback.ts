'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { isValidUserType, USER_TYPE, type UserType } from '@snappin/shared/types';
import { getKakaoLoginApiUrl } from '@/app/(auth)/login/lib/kakaoAuth';
import { setAuthUser } from '@/auth/userType';
import { setAccessToken } from '@/auth/token.client';
import { useKakaoLogin } from '@/auth/apis';
import { getReturnToParam, readReturnToContext, resolveReturnToPath } from '@/auth/utils/returnTo';
import { PHOTOGRAPHERS_ROUTES, ROUTES } from '@/constants/routes/routes';
import type { CreateKakaoLoginResponse } from '@/swagger-api';

// 로그인 실패 시 리다이렉트할 경로 생성
const getLoginErrorPath = (returnTo: ReturnType<typeof readReturnToContext>) =>
  ROUTES.LOGIN({
    error: 'kakao',
    ...getReturnToParam(returnTo),
  });

// 로그인 성공 후 리다이렉트할 경로 결정
const getPostLoginDestination = (
  loginData: CreateKakaoLoginResponse,
  returnTo: ReturnType<typeof readReturnToContext>,
) => {
  if (!loginData.isOnboardingCompleted) {
    return ROUTES.ON_BOARDING(1, getReturnToParam(returnTo));
  }

  if (returnTo.returnTo) {
    return resolveReturnToPath(returnTo, ROUTES.HOME);
  }

  return loginData.role === USER_TYPE.PHOTOGRAPHER
    ? PHOTOGRAPHERS_ROUTES.RESERVATIONS()
    : ROUTES.HOME;
};

export default function useKakaoCallback() {
  const params = useSearchParams();
  const startedRef = useRef(false);
  const kakaoLoginApiUrl = getKakaoLoginApiUrl();

  const code = params.get('code');
  const error = params.get('error');
  const state = params.get('state');
  const returnToContext = readReturnToContext(new URLSearchParams(state ?? ''));

  const { mutateAsync } = useKakaoLogin(kakaoLoginApiUrl ?? '');

  useEffect(() => {
    if (startedRef.current) return;

    if (error) {
      startedRef.current = true;
      window.location.replace(getLoginErrorPath(returnToContext));
      return;
    }

    if (!kakaoLoginApiUrl) {
      startedRef.current = true;
      window.location.replace(getLoginErrorPath(returnToContext));
      return;
    }

    if (!code) return;

    startedRef.current = true;

    (async () => {
      try {
        const data = await mutateAsync({ code });
        const loginData = data.data;

        if (!loginData?.accessToken || !loginData?.role) {
          throw new Error('accessToken or role is missing in the response');
        }

        if (!isValidUserType(loginData.role)) {
          throw new Error(`Invalid role: ${loginData.role}`);
        }

        await setAccessToken(loginData.accessToken);
        await setAuthUser({
          role: loginData.role,
          hasPhotographerProfile: loginData.hasPhotographerProfile ?? false,
        });

        window.location.replace(getPostLoginDestination(loginData, returnToContext));
      } catch {
        window.location.replace(getLoginErrorPath(returnToContext));
      }
    })();
  }, [code, error, kakaoLoginApiUrl, mutateAsync, returnToContext]);
}
