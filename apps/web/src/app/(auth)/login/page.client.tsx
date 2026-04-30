'use client';

import useLogin from '@/app/(auth)/login/hooks/useLogin';
import { LoginButton } from '@/app/(auth)/login/components';

type PageClientProps = {
  error?: string;
  returnTo?: string;
};

export default function PageClient({ error, returnTo }: PageClientProps) {
  const { handleKakaoLogin } = useLogin({
    loginError: error,
    returnTo,
  });

  return <LoginButton onKakaoLogin={handleKakaoLogin} />;
}
