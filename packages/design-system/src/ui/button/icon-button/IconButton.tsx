import { ButtonHTMLAttributes } from 'react';
import { cn } from '../../../lib/cn';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function IconButton({ children, className, disabled, ...props }: IconButtonProps) {
  return (
    <button
      type='button'
      className={cn('cursor-pointer', disabled && 'cursor-not-allowed', className)}
      aria-disabled={disabled}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
