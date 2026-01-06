import { useSetAtom } from 'jotai';
import { ToastAtom } from '../toast.atom';

export const useToast = () => {
  const addToast = useSetAtom(ToastAtom);

  return {
    success: (message: string) => addToast({ type: 'success', message }),
    error: (message: string) => addToast({ type: 'error', message }),
    alert: (message: string) => addToast({ type: 'alert', message }),
  };
};
