'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';
import Lottie from 'lottie-react';
import { successAnimation, errorAnimation } from '@snappin/design-system/lotties';
import { ROUTES } from '@/constants/routes/routes';
import { RemoveToastAtom, ToastProps } from '@/ui';
import { cn } from '@snappin/design-system/lib/cn';

const FADE_MS = 300;
const ANIMATION_DATA = {
  success: successAnimation,
  error: errorAnimation,
  login: null,
} as const;

export default function Toast(props: ToastProps) {
  const { type, message, className, duration = 3000 } = props;
  const removeToast = useSetAtom(RemoveToastAtom);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const startFadeOutAt = Math.max(0, duration - FADE_MS);

    const fadeOutTimeout = window.setTimeout(() => {
      setIsFadingOut(true);
    }, startFadeOutAt);

    const removeTimeout = window.setTimeout(() => {
      removeToast();
    }, duration);

    return () => {
      window.clearTimeout(fadeOutTimeout);
      window.clearTimeout(removeTimeout);
    };
  }, [removeToast, duration]);

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-[0.6rem] bg-black/60 px-[1.2rem] py-[1.3rem]',
        isFadingOut ? 'animate-fade-out' : 'animate-fade-in',
        className,
      )}
    >
      {type !== 'alert' && ANIMATION_DATA[type] && (
        <Lottie animationData={ANIMATION_DATA[type]} className='h-[3rem] w-[3rem]' />
      )}
      <div className='caption-14-rg text-black-1'>{message}</div>
      {type === 'login' && (
        <Link
          href={ROUTES.LOGIN(props.returnTo ? { returnTo: props.returnTo } : undefined)}
          className='caption-14-md text-neon-black ml-[1rem] underline'
        >
          로그인하기
        </Link>
      )}
    </div>
  );
}
