import { useSetAtom } from 'jotai';
import { ToastAtom } from '../toast.atom';
import { useMemo } from 'react';

export const useToast = () => {
  const addToast = useSetAtom(ToastAtom);

  return useMemo(
    () => ({
      success: (message: string, duration?: number) =>
        addToast({ type: 'success', message, duration }),
      error: (message: string, duration?: number) => addToast({ type: 'error', message, duration }),
      alert: (message: string, duration?: number) => addToast({ type: 'alert', message, duration }),
      login: (message: string, duration?: number) => addToast({ type: 'login', message, duration }),
    }),
    [addToast],
  );
};
