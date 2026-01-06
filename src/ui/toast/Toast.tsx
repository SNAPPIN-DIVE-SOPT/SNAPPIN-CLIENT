'use client';

import { useEffect } from 'react';
import { ToastProps } from './types/toast';
import { cn } from '@/utils/cn';
import { useSetAtom } from 'jotai';
import { RemoveToastAtom } from './toast.atom';
import Lottie from 'lottie-react';
import successAnimation from '@/assets/lotties/success.json';
import errorAnimation from '@/assets/lotties/error.json';

export default function Toast({ type, message, duration = 3000, className }: ToastProps) {
  const removeToast = useSetAtom(RemoveToastAtom);

  useEffect(() => {
    const fadeOutTimeout = setTimeout(() => {
      const removeTimeout = setTimeout(() => {
        removeToast();
      }, 300);

      return () => clearTimeout(removeTimeout);
    }, duration);

    return () => clearTimeout(fadeOutTimeout);
  }, [removeToast]);

  const icon = {
    success: <Lottie animationData={successAnimation} className='h-[3rem] w-[3rem]' />,
    error: <Lottie animationData={errorAnimation} className='h-[3rem] w-[3rem]' />,
    alert: null,
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-[0.6rem] bg-[rgba(0,0,0,0.5)] px-[0.5rem] px-[1.2rem] py-[1rem]',
        className,
      )}
    >
      {icon[type]}
      <div className='text-black-1 caption-12-md'>{message}</div>
    </div>
  );
}
