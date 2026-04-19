'use client';

import { Logo } from '@snappin/design-system/assets';
import { ImageSlide } from '@snappin/design-system';
import useLogin from '@/app/(auth)/login/hooks/useLogin';
import { ClientNavigation, LoginButton } from '@/app/(auth)/login/components';

type PageClientProps = {
  error?: string;
  returnTo?: string;
};

export default function PageClient({ error, returnTo }: PageClientProps) {
  const { handleKakaoLogin } = useLogin({
    loginError: error,
    returnTo,
  });

  return (
    <>
      <ClientNavigation />
      <div className='mt-[6.4rem] flex flex-col gap-[2.4rem]'>
        <div className='flex flex-col items-center gap-[1.2rem]'>
          <Logo className='text-neon-black h-[2.8rem] w-[15.8rem]' />
          <p className='title-20-md text-black-1'>나만의 무드에서 시작되는 스냅</p>
        </div>
        <ImageSlide />
        <div className='flex justify-center px-[2rem]'>
          <LoginButton onKakaoLogin={handleKakaoLogin} />
        </div>
      </div>
    </>
  );
}
