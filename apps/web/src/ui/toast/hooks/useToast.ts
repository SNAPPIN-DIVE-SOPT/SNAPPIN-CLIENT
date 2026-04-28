'use client';

import { useMemo } from 'react';
import { useSetAtom } from 'jotai';
import { RemoveToastAtom, ToastAtom } from '@/ui';

export const useToast = () => {
  const addToast = useSetAtom(ToastAtom);
  const removeToast = useSetAtom(RemoveToastAtom);

  return useMemo(
    () => ({
      success: (message: string, className?: string, duration?: number) =>
        addToast({ type: 'success', message, duration, className }),

      error: (message: string, className?: string, duration?: number) =>
        addToast({ type: 'error', message, duration, className }),

      alert: (message: string, className?: string, duration?: number) =>
        addToast({ type: 'alert', message, duration, className }),

      login: (message: string, className?: string, returnTo?: string, duration?: number) =>
        addToast({ type: 'login', message, duration, className, returnTo }),

      removeToast: () => removeToast(),
    }),
    [addToast, removeToast],
  );
};
