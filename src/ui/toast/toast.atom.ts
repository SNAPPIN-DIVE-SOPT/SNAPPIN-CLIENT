import { atom } from 'jotai';
import { ToastProps } from './types/toast';

export const ToastDataAtom = atom<ToastProps | null>(null);

export const ToastAtom = atom(
  null,
  (_, set, { type, message, duration, className }: ToastProps) => {
    const newToast = {
      type,
      message,
      duration,
      className,
      id: Date.now().toString(),
    };

    set(ToastDataAtom, newToast);
  },
);

export const RemoveToastAtom = atom(null, (_, set) => {
  set(ToastDataAtom, null);
});
