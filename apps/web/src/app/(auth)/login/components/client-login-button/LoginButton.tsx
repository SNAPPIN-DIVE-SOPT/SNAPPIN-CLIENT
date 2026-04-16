'use client';

import { useEffect } from 'react';
import { useToast } from '@/ui/toast/hooks/useToast';
import { BottomCTAButton } from '@snappin/design-system';
import { IconKakao } from '@snappin/design-system/assets';

type LoginButtonProps = {
  returnTo?: string;
};

export default function LoginButton({ returnTo }: LoginButtonProps) {
  const { removeToast } = useToast();
  const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URL!;
  const state = returnTo ? new URLSearchParams({ returnTo }).toString() : '';
  const KAKAO_LOGIN_URL =
    `https://kauth.kakao.com/oauth/authorize` +
    `?response_type=code` +
    `&client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    (state ? `&state=${encodeURIComponent(state)}` : '');

  const handleLogin = () => {
    window.location.href = KAKAO_LOGIN_URL;
  };

  useEffect(() => {
    removeToast();
  }, []);

  return (
    <BottomCTAButton fixed={true} hasPadding={true} className='z-100 px-[2rem]'>
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
