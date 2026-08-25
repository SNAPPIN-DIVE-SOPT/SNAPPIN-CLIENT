export type ToastType = 'success' | 'error' | 'alert' | 'login';

type BaseToastProps = {
  message: string;
  duration?: number;
  className?: string;
};

type LoginToastProps = BaseToastProps & {
  type: 'login';
  returnTo?: string;
};

type DefaultToastProps = BaseToastProps & {
  type: Exclude<ToastType, 'login'>;
};

export type ToastProps = LoginToastProps | DefaultToastProps;

export type ToastOptions = Omit<DefaultToastProps, 'message' | 'type'>;

export type LoginToastOptions = Omit<LoginToastProps, 'message' | 'type'>;
