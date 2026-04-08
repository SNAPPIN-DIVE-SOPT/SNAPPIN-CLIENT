'use client';

import { useSearchParams } from 'next/navigation';
import { BottomCTAButton } from '@snappin/design-system';
import { IconKakao } from '@snappin/design-system/assets';
import { readReturnToContext, serializeReturnToState } from '@/auth/utils/returnTo';

export default function LoginButton() {
  const searchParams = useSearchParams();
  const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URL!;
  const state = serializeReturnToState(readReturnToContext(searchParams));
  const KAKAO_LOGIN_URL =
    `https://kauth.kakao.com/oauth/authorize` +
    `?response_type=code` +
    `&client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    (state ? `&state=${encodeURIComponent(state)}` : '');

  const handleLogin = () => {
    window.location.href = KAKAO_LOGIN_URL;
  };

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
