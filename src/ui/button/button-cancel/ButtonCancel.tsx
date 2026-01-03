import { IconClose } from '@/assets';
import { cn } from '@/utils/cn';
import { ButtonHTMLAttributes } from 'react';

type ButtonCancelProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonCancel({ className, ...props }: ButtonCancelProps) {
  return (
    <button
      className={cn(
        'bg-black-1 flex w-fit cursor-pointer items-center justify-center rounded-full p-[0.4rem]',
        className,
      )}
      {...props}
    >
      <IconClose />
    </button>
  );
}
