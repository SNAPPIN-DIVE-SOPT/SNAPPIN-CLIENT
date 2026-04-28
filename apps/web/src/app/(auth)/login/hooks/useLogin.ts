'use client';

import { useEffect } from 'react';
import { getKakaoAuthorizeUrl } from '@/app/(auth)/login/lib/kakaoAuth';
import { useToast } from '@/ui/toast/hooks/useToast';

type UseLoginPageParams = {
  loginError?: string;
  returnTo?: string;
};

export default function useLoginPage({ loginError, returnTo }: UseLoginPageParams) {
  const { error, removeToast } = useToast();

  useEffect(() => {
    if (loginError === 'kakao') {
      error('카카오 로그인에 실패했습니다. 다시 시도해주세요.', undefined, 'bottom-[8.5rem]');
      return;
    }

    removeToast();
  }, [error, loginError, removeToast]);

  const handleKakaoLogin = () => {
    const kakaoAuthorizeUrl = getKakaoAuthorizeUrl(returnTo);

    if (!kakaoAuthorizeUrl) {
      console.error('Kakao login env is missing');
      return;
    }

    window.location.href = kakaoAuthorizeUrl;
  };

  return {
    handleKakaoLogin,
  };
}
