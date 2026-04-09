export type ToastType = 'success' | 'error' | 'alert' | 'login';

export type ToastProps = {
  type: ToastType;
  message: string;
  duration?: number;
  className?: string;
};
