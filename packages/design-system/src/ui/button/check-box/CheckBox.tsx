import { ButtonHTMLAttributes } from 'react';
import { IconCheck } from '../../../assets';
import { cn } from '../../../lib';

type CheckBoxProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isChecked?: boolean;
};

export default function CheckBox({ isChecked, ...props }: CheckBoxProps) {
  return (
    <button
      type='button'
      aria-pressed={isChecked}
      className={cn(
        'flex h-[2.1rem] w-[2.1rem] items-center justify-center rounded-[0.3rem] px-[0.3rem] pt-[0.5rem] pb-[0.4rem] transition-[background-color,border-color,transform] duration-200 ease-out active:scale-95',
        isChecked && 'border-black-10 bg-black-10',
        !isChecked && 'border-black-5 bg-black-1 border-[1.5px]',
      )}
      {...props}
    >
      <IconCheck
        className={cn(
          'text-neon-white transition-all duration-200 ease-out',
          isChecked ? 'scale-100 opacity-100' : 'scale-75 opacity-0',
        )}
      />
    </button>
  );
}
