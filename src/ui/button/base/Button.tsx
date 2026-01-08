import { cn } from '@/utils/cn';
import { ButtonColor, ButtonDisplay, ButtonSize } from '@/ui/button/base/types/variant';
import {
  BUTTON_BASE,
  BUTTON_COLOR,
  BUTTON_DISABLED,
  BUTTON_DISPLAY,
  BUTTON_SIZE,
} from '@/ui/button/base/constants/theme';
import { ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  display?: ButtonDisplay;
  size?: ButtonSize;
  color?: ButtonColor;
  isLoading?: boolean;
};

export default function Button({
  children,
  display = 'block',
  size = 'large',
  color = 'primary',
  disabled = false,
  type = 'button',
  isLoading = false,
  className,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      className={cn(
        BUTTON_BASE,
        BUTTON_DISPLAY[display],
        BUTTON_SIZE[size],
        BUTTON_COLOR[color],
        isDisabled && BUTTON_DISABLED,
        className,
      )}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      {...rest}
    >
      {children}
    </button>
  );
}
