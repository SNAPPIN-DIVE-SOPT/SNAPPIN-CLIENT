import { ButtonHTMLAttributes } from 'react';
import { IconArrows } from '@/src/assets';
import { cn } from '@/src/utils/cn';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonText: string;
};

export default function Button({
  buttonText,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      {...props}
      className={cn(
        `
        w-[26.4rem]
        px-[2rem] py-[1.3rem]
        rounded-[5.6rem]
        flex items-center justify-center gap-[0.4rem]
        font-16-bd text-black-10
        bg-[linear-gradient(94deg,#E7FF7E_10.79%,#D0FF00_91.23%)]
        `,
        className
      )}
    >
      {buttonText}
      <IconArrows />
    </button>
  );
}