'use client';

import { useMemo } from 'react';
import { useSetAtom } from 'jotai';
import { RemoveToastAtom, ToastAtom } from '../toast.atom';

export const useToast = () => {
  const addToast = useSetAtom(ToastAtom);
  const removeToast = useSetAtom(RemoveToastAtom);

  return useMemo(
    () => ({
      success: (message: string, duration?: number, className?: string) =>
        addToast({ type: 'success', message, duration, className }),

      error: (message: string, duration?: number, className?: string) =>
        addToast({ type: 'error', message, duration, className }),

      alert: (message: string, duration?: number, className?: string) =>
        addToast({ type: 'alert', message, duration, className }),

      login: (message: string, duration?: number, className?: string) =>
        addToast({ type: 'login', message, duration, className }),

      removeToast: () => removeToast(),
    }),
    [addToast, removeToast],
  );
};
