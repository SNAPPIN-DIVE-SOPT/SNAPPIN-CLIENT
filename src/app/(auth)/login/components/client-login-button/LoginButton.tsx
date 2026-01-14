'use client';

import { Button } from '@/ui';
import { IconKakao } from '@/assets';

export default function LoginButton() {
  const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URL!;
  const KAKAO_LOGIN_URL =
    `https://kauth.kakao.com/oauth/authorize` +
    `?response_type=code` +
    `&client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  const handleLogin = () => {
    window.location.href = KAKAO_LOGIN_URL;
  };

  return (
    <Button
      color='primary'
      size='large'
      className='bg-kakao flex items-center gap-[1rem]'
      onClick={handleLogin}
    >
      <IconKakao color='bg-black-10' />
      <span className='font-16-md text-black-10'>카카오 로그인</span>
    </Button>
  );
}
