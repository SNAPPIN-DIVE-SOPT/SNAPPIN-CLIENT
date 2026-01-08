'use client';

import { Button } from '@/ui';
import { IconKakao } from '@/assets';

export default function LoginButton() {
  const handleLogin = () => {
    //TODO: 카카오 로그인 호출
  };

  return (
    <Button
      color='primary'
      size='large'
      className='bg-kakao flex items-center gap-[1rem]'
      onClick={handleLogin}
    >
      <IconKakao color='bg-black-10' />
      <span>카카오 로그인</span>
    </Button>
  );
}
