import { useAuth } from '@/auth/hooks/useAuth';
import { useToast } from '@/ui';
import { useEffect, useRef } from 'react';

type UseLoginToastGuardOptions = {
  message?: string;
  duration?: number;
  toastPositionClassName?: string;
  returnTo?: string;
};

export const useLoginToastGuard = ({
  message,
  duration,
  toastPositionClassName,
  returnTo,
}: UseLoginToastGuardOptions) => {
  const { isLogIn } = useAuth();
  const { login } = useToast();
  const defaultToastMessage = '이 기능은 로그인 후에 사용할 수 있어요.';
  const defaultToastPositionClassName = 'bottom-[8.6rem]';

  const authResolved = isLogIn !== null;
  const isLoggedIn = isLogIn === true;

  const shownRef = useRef(false);

  useEffect(() => {
    if (!authResolved) return;
    if (isLoggedIn) return;

    if (shownRef.current) return;
    shownRef.current = true;

    login(
      message ?? defaultToastMessage,
      toastPositionClassName ?? defaultToastPositionClassName,
      duration,
      returnTo,
    );
  }, [authResolved, duration, isLoggedIn, login, message, returnTo, toastPositionClassName]);

  return { authResolved, isLoggedIn };
};
