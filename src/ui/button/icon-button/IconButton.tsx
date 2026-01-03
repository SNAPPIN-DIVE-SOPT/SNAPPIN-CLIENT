import { cn } from '@/utils/cn';
import { ButtonHTMLAttributes } from 'react';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function IconButton({ children, className, disabled, ...props }: IconButtonProps) {
  return (
    <button
      type='button'
      className={cn('cursor-pointer', disabled && 'cursor-not-allowed', className)}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
