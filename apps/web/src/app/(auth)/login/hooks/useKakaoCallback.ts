'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { isValidUserType, USER_TYPE, type UserType } from '@snappin/shared/types';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { setAuthUser } from '@/auth/userType';
import { setAccessToken } from '@/auth/token.client';
import { useKakaoLogin } from '@/auth/apis';
import { getReturnToParam, readReturnToContext, resolveReturnToPath } from '@/auth/utils/returnTo';
import { PHOTOGRAPHERS_ROUTES, ROUTES } from '@/constants/routes/routes';
import type { CreateKakaoLoginResponse } from '@/swagger-api';

const CLIENT_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URL;

const KAKAO_LOGIN_URL =
  `${SERVER_API_BASE_URL}/api/v2/auth/login/kakao` +
  `?redirect_uri=${encodeURIComponent(CLIENT_REDIRECT_URI!)}`;

// 로그인 실패 시 리다이렉트할 경로를 생성하는 함수
const getLoginErrorPath = (returnTo: ReturnType<typeof readReturnToContext>) =>
  ROUTES.LOGIN({
    error: 'kakao',
    ...getReturnToParam(returnTo),
  });

// 로그인 성공 후 리다이렉트할 경로를 결정하는 함수
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

  const code = params.get('code');
  const error = params.get('error');
  const state = params.get('state');
  const returnToContext = readReturnToContext(new URLSearchParams(state ?? ''));

  const { mutateAsync } = useKakaoLogin(KAKAO_LOGIN_URL);

  useEffect(() => {
    if (startedRef.current) return;

    if (error) {
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
          role: loginData.role as UserType,
          hasPhotographerProfile: loginData.hasPhotographerProfile ?? false,
        });

        window.location.replace(getPostLoginDestination(loginData, returnToContext));
      } catch {
        window.location.replace(getLoginErrorPath(returnToContext));
      }
    })();
  }, [code, error, mutateAsync, returnToContext]);
}
