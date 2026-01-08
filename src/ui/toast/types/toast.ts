export type ToastType = 'success' | 'error' | 'alert';

export type ToastProps = {
  type: ToastType;
  message: string;
  duration?: number;
  className?: string;
};
