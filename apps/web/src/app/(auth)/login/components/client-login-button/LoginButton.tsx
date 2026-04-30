'use client';

import { BottomCTAButton } from '@snappin/design-system';
import { IconKakao } from '@snappin/design-system/assets';

type LoginButtonProps = {
  onKakaoLogin: () => void;
};

export default function LoginButton({ onKakaoLogin }: LoginButtonProps) {
  return (
    <BottomCTAButton fixed hasPadding className='z-50 px-[2rem]'>
      <BottomCTAButton.Single
        color='primary'
        onClick={onKakaoLogin}
        className='bg-kakao flex items-center gap-[1rem]'
      >
        <IconKakao color='bg-black-10' />
        <span className='font-16-md text-black-10'>카카오 로그인</span>
      </BottomCTAButton.Single>
    </BottomCTAButton>
  );
}
