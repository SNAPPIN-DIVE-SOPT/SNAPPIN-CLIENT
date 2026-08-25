'use client';

import { useMemo } from 'react';
import { useSetAtom } from 'jotai';
import { RemoveToastAtom, ToastAtom } from '@/ui';
import type { LoginToastOptions, ToastOptions } from '../types/toast';

export const useToast = () => {
  const addToast = useSetAtom(ToastAtom);
  const removeToast = useSetAtom(RemoveToastAtom);

  return useMemo(
    () => ({
      success: (message: string, options?: ToastOptions) =>
        addToast({ type: 'success', message, ...options }),

      error: (message: string, options?: ToastOptions) =>
        addToast({ type: 'error', message, ...options }),

      alert: (message: string, options?: ToastOptions) =>
        addToast({ type: 'alert', message, ...options }),

      login: (message: string, options?: LoginToastOptions) =>
        addToast({ type: 'login', message, ...options }),

      removeToast: () => removeToast(),
    }),
    [addToast, removeToast],
  );
};
