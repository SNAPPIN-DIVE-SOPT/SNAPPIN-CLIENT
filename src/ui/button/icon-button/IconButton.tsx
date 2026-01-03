import { cn } from '@/utils/cn';
import { ButtonHTMLAttributes } from 'react';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function IconButton({ children, className, ...props }: IconButtonProps) {
  return (
    <button
      className={cn(
        'bg-black-1 flex w-fit cursor-pointer items-center justify-center rounded-full p-[0.4rem]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
