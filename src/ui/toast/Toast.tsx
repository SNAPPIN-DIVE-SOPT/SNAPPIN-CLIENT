'use client';

import { useEffect, useState } from 'react';
import type { ToastProps } from './types/toast';
import { cn } from '@/utils/cn';
import { useSetAtom } from 'jotai';
import { RemoveToastAtom } from './toast.atom';
import Lottie from 'lottie-react';
import successAnimation from '@/assets/lotties/success.json';
import errorAnimation from '@/assets/lotties/error.json';
import Link from 'next/link';

const FADE_MS = 300;
const ANIMATION_DATA = {
  success: successAnimation,
  error: errorAnimation,
  login: null,
} as const;

export default function Toast({ type, message, duration = 3000, className }: ToastProps) {
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
        'flex items-center justify-center rounded-[0.6rem] bg-black/50 px-[1.2rem] py-[1.3rem]',
        isFadingOut ? 'animate-fade-out' : 'animate-fade-in',
        className,
      )}
    >
      {type !== 'alert' && ANIMATION_DATA[type] && (
        <Lottie animationData={ANIMATION_DATA[type]} className='h-[3rem] w-[3rem]' />
      )}
      <div className='caption-12-md text-black-1'>{message}</div>
      {type === 'login' && (
        <Link href='/login' className='caption-12-md text-neon-black ml-[1rem] underline'>
          로그인하기
        </Link>
      )}
    </div>
  );
}
