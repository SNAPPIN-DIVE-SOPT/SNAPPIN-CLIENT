'use client';

import { useEffect } from 'react';
import { useToast } from '@/ui/toast/hooks/useToast';
import { BottomCTAButton } from '@snappin/design-system';
import { IconKakao } from '@snappin/design-system/assets';

type LoginButtonProps = {
  loginError?: string;
  returnTo?: string;
};

const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URL;

export default function LoginButton({ loginError, returnTo }: LoginButtonProps) {
  const { error, removeToast } = useToast();

  useEffect(() => {
    if (loginError === 'kakao') {
      error('카카오 로그인에 실패했습니다. 다시 시도해주세요.', 'bottom-[8.5rem]');
      return;
    }

    removeToast();
  }, [error, loginError, removeToast]);

  const handleLogin = () => {
    if (!CLIENT_ID || !REDIRECT_URI) {
      console.error('Kakao login env is missing');
      return;
    }

    const state = returnTo ? new URLSearchParams({ returnTo }).toString() : '';

    const kakaoLoginUrl =
      `https://kauth.kakao.com/oauth/authorize` +
      `?response_type=code` +
      `&client_id=${CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      (state ? `&state=${encodeURIComponent(state)}` : '');

    window.location.href = kakaoLoginUrl;
  };

  return (
    <BottomCTAButton fixed hasPadding className='z-50 px-[2rem]'>
      <BottomCTAButton.Single
        color='primary'
        onClick={handleLogin}
        className='bg-kakao flex items-center gap-[1rem]'
      >
        <IconKakao color='bg-black-10' />
        <span className='font-16-md text-black-10'>카카오 로그인</span>
      </BottomCTAButton.Single>
    </BottomCTAButton>
  );
}
